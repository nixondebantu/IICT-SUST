import {
  eq,
  desc,
  asc,
  and,
  or,
  gte,
  lte,
  ilike,
  inArray,
  count,
} from "drizzle-orm";
import { db } from "../db/index.js";
import { notices } from "../db/schemas/notice.schema.js";
import { noticesToTags } from "../db/schemas/notices_to_tags.schema.js";
import { cloudinary } from "../services/file.service.js";

const createNotice = async (req, res) => {
  const { title, description, date, tagIds } = req.body;

  if (!title || !date) {
    return res.status(400).json({ message: "Title and date are required." });
  }

  if (tagIds && !Array.isArray(tagIds)) {
    return res.status(400).json({ message: "tagIds must be an array." });
  }

  try {
    const newNotice = await db.transaction(async (tx) => {
      const fileUrls = req.files?.map((file) => file.path) || [];

      const [createdNotice] = await tx
        .insert(notices)
        .values({
          title,
          description,
          date: new Date(date),
          file_url: fileUrls.length > 0 ? fileUrls : null,
          creator_id: parseInt(req.user.id, 10),
        })
        .returning();

      if (tagIds && tagIds.length > 0) {
        const tagsToInsert = tagIds.map((tagId) => ({
          notice_id: createdNotice.id,
          tag_id: parseInt(tagId, 10),
        }));
        await tx.insert(noticesToTags).values(tagsToInsert);
      }

      // Use `query` for rich relation fetching after creation
      return tx.query.notices.findFirst({
        where: eq(notices.id, createdNotice.id),
        with: {
          creator: { columns: { password_hash: false } },
          noticesToTags: { with: { tag: true } },
        },
      });
    });

    res.status(201).json({
      message: "Notice created successfully",
      notice: newNotice,
    });
  } catch (error) {
    console.error("Create notice error:", error);
    // If the transaction fails, attempt to delete any files uploaded to Cloudinary
    if (req.files) {
      for (const file of req.files) {
        // Extract public_id from the file path/URL
        const publicId = file.path.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId).catch(console.error);
      }
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

const getNotices = async (req, res) => {
  try {
    // 1. Extract query parameters
    const {
      page = 1,
      limit = 10,
      tag,
      startDate,
      endDate,
      search,
      sortBy = "date",
      order = "desc",
    } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const offset = (pageNumber - 1) * limitNumber;

    // 2. Build dynamic filter conditions
    const conditions = [];

    if (search) {
      const searchKeyword = `%${search}%`;
      conditions.push(
        or(
          ilike(notices.title, searchKeyword),
          ilike(notices.description, searchKeyword)
        )
      );
    }

    if (startDate) {
      conditions.push(gte(notices.date, new Date(startDate)));
    }

    if (endDate) {
      conditions.push(lte(notices.date, new Date(endDate)));
    }

    // Handle tag filtering using a subquery
    if (tag) {
      const tagIds = Array.isArray(tag)
        ? tag.map((t) => parseInt(t, 10))
        : [parseInt(tag, 10)];

      const noticeIdsWithTag = await db
        .selectDistinct({ noticeId: noticesToTags.notice_id })
        .from(noticesToTags)
        .where(inArray(noticesToTags.tag_id, tagIds));

      if (noticeIdsWithTag.length === 0) {
        // If no notices match the tag, return empty result immediately
        return res.status(200).json({
          notices: [],
          totalNotices: 0,
          totalPages: 0,
          currentPage: pageNumber,
        });
      }

      const ids = noticeIdsWithTag.map((item) => item.noticeId);
      conditions.push(inArray(notices.id, ids));
    }

    const finalConditions = and(...conditions);

    // 3. Perform two queries: one for the total count, one for the paginated data
    const [totalResult, noticesData] = await Promise.all([
      // Count query
      db.select({ total: count() }).from(notices).where(finalConditions),
      // Data query
      db.query.notices.findMany({
        where: finalConditions,
        orderBy:
          sortBy === "date"
            ? order === "asc"
              ? [asc(notices.date)]
              : [desc(notices.date)]
            : [desc(notices.created_at)], // Default sort
        limit: limitNumber,
        offset: offset,
        with: {
          noticesToTags: { with: { tag: true } },
        },
      }),
    ]);

    const totalNotices = totalResult[0].total;
    const totalPages = Math.ceil(totalNotices / limitNumber);

    // 4. Send the response
    res.status(200).json({
      notices: noticesData,
      totalNotices,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error("Get notices error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getNoticeById = async (req, res) => {
  const { id } = req.params;
  try {
    const notice = await db.query.notices.findFirst({
      where: eq(notices.id, parseInt(id, 10)),
      with: {
        creator: { columns: { password_hash: false } },
        noticesToTags: { with: { tag: true } },
      },
    });

    if (!notice) {
      return res.status(404).json({ message: "Notice not found." });
    }

    res.status(200).json(notice);
  } catch (error) {
    console.error("Get notice by ID error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateNotice = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, tagIds } = req.body;
  const noticeId = parseInt(id, 10);
  let newFileUrls = [];

  try {
    const updatedNotice = await db.transaction(async (tx) => {
      const [existingNotice] = await tx
        .select({ file_url: notices.file_url })
        .from(notices)
        .where(eq(notices.id, noticeId));

      if (!existingNotice) {
        throw new Error("NoticeNotFound");
      }

      const updatedData = {};
      if (title) updatedData.title = title;
      if (description !== undefined) updatedData.description = description;
      if (date) updatedData.date = new Date(date);

      if (req.files && req.files.length > 0) {
        // Delete old files from Cloudinary if they exist
        if (existingNotice.file_url?.length > 0) {
          for (const url of existingNotice.file_url) {
            const publicId = url.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(publicId).catch(console.error);
          }
        }
        newFileUrls = req.files.map((file) => file.path);
        updatedData.file_url = newFileUrls;
      }

      if (Object.keys(updatedData).length > 0) {
        await tx
          .update(notices)
          .set(updatedData)
          .where(eq(notices.id, noticeId));
      }

      if (tagIds !== undefined) {
        await tx
          .delete(noticesToTags)
          .where(eq(noticesToTags.notice_id, noticeId));

        if (Array.isArray(tagIds) && tagIds.length > 0) {
          const tagsToInsert = tagIds.map((tagId) => ({
            notice_id: noticeId,
            tag_id: parseInt(tagId, 10),
          }));
          await tx.insert(noticesToTags).values(tagsToInsert);
        }
      }

      return tx.query.notices.findFirst({
        where: eq(notices.id, noticeId),
        with: {
          creator: { columns: { password_hash: false } },
          noticesToTags: { with: { tag: true } },
        },
      });
    });

    res.status(200).json({
      message: "Notice updated successfully",
      notice: updatedNotice,
    });
  } catch (error) {
    // If the transaction fails, delete any newly uploaded files
    if (newFileUrls.length > 0) {
      for (const url of newFileUrls) {
        const publicId = url.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId).catch(console.error);
      }
    }

    if (error.message === "NoticeNotFound") {
      return res.status(404).json({ message: "Notice not found." });
    }
    console.error("Update notice error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteNotice = async (req, res) => {
  const { id } = req.params;
  try {
    const [deletedNotice] = await db
      .delete(notices)
      .where(eq(notices.id, parseInt(id, 10)))
      .returning();

    if (!deletedNotice) {
      return res.status(404).json({ message: "Notice not found." });
    }

    // Clean up associated files from Cloudinary
    if (deletedNotice.file_url?.length > 0) {
      for (const url of deletedNotice.file_url) {
        const publicId = url.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId).catch(console.error);
      }
    }

    return res.status(200).json({ message: "Notice deleted successfully." });
  } catch (error) {
    console.error("Delete notice error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { createNotice, deleteNotice, getNotices, getNoticeById, updateNotice };
