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
import { files } from "../db/schemas/file.schema.js";

const formatNoticeForResponse = (notice) => {
  if (!notice) {
    return null;
  }

  // Creator can be null if the user was deleted and the foreign key was set to null.
  const creator = notice.creator
    ? {
        id: notice.creator.id,
        name: notice.creator.name,
        email: notice.creator.email,
      }
    : null;

  return {
    id: notice.id,
    title: notice.title,
    description: notice.description,
    date: notice.date.toISOString(),
    creator_id: notice.creator_id,
    creator,
    tags: notice.noticesToTags.map((join) => ({
      id: join.tag.id,
      value: join.tag.value,
      type: join.tag.type,
    })),
    files: notice.files.map((file) => ({
      id: file.id,
      title: file.title,
      url: file.url,
    })),
  };
};

const validateFilesInput = (filesData) => {
  if (filesData) {
    if (!Array.isArray(filesData)) {
      return "Files must be an array.";
    }
    for (const file of filesData) {
      if (!file.url || !file.title) {
        return "Each file object must have a 'url' and a 'title'.";
      }
    }
  }
  return null;
};

const createNotice = async (req, res) => {
  const { title, description, date, tagIds, files: filesData } = req.body;

  if (!title || !date || !description) {
    return res
      .status(400)
      .json({ message: "Title, date, and description are required." });
  }

  const filesError = validateFilesInput(filesData);
  if (filesError) {
    return res.status(400).json({ message: filesError });
  }

  try {
    const newNotice = await db.transaction(async (tx) => {
      const [createdNotice] = await tx
        .insert(notices)
        .values({
          title,
          description,
          date: new Date(date),
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

      if (filesData && filesData.length > 0) {
        const filesToInsert = filesData.map((file) => ({
          ...file,
          entity_id: createdNotice.id,
          entity_type: "notice",
        }));
        await tx.insert(files).values(filesToInsert);
      }

      return tx.query.notices.findFirst({
        where: eq(notices.id, createdNotice.id),
        with: {
          creator: { columns: { password: false } },
          noticesToTags: { with: { tag: true } },
          files: true,
        },
      });
    });

    res.status(201).json({
      message: "Notice created successfully",
      notice: formatNoticeForResponse(newNotice),
    });
  } catch (error) {
    console.error("Create notice error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getNotices = async (req, res) => {
  try {
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

    if (tag) {
      const tagIds = Array.isArray(tag)
        ? tag.map((t) => parseInt(t, 10))
        : [parseInt(tag, 10)];

      const noticeIdsWithTag = await db
        .selectDistinct({ noticeId: noticesToTags.notice_id })
        .from(noticesToTags)
        .where(inArray(noticesToTags.tag_id, tagIds));

      if (noticeIdsWithTag.length === 0) {
        return res.status(200).json({
          result: [],
          total: 0,
          totalPages: 0,
          currentPage: pageNumber,
        });
      }

      const ids = noticeIdsWithTag.map((item) => item.noticeId);
      conditions.push(inArray(notices.id, ids));
    }

    const finalConditions = and(...conditions);

    const [totalResult, noticesData] = await Promise.all([
      db.select({ total: count() }).from(notices).where(finalConditions),
      db.query.notices.findMany({
        where: finalConditions,
        orderBy:
          sortBy === "date"
            ? order === "asc"
              ? [asc(notices.date)]
              : [desc(notices.date)]
            : [desc(notices.created_at)],
        limit: limitNumber,
        offset: offset,
        with: {
          noticesToTags: { with: { tag: true } },
          files: true,
        },
      }),
    ]);

    const processedNotices = noticesData.map((notice) => {
      const formattedNotice = formatNoticeForResponse(notice);

      // add ... for title if that has length more then 200 letter
      if (formattedNotice.title && formattedNotice.title.length > 100) {
        formattedNotice.title = formattedNotice.title.slice(0, 100) + " ...";
      }

      if (formattedNotice.description) {
        const words = formattedNotice.description.split(" ");
        if (words.length > 20) {
          formattedNotice.description = words.slice(0, 20).join(" ") + " ...";
        }
      }
      return formattedNotice;
    });

    const total = totalResult[0].total;
    const totalPages = Math.ceil(total / limitNumber);

    res.status(200).json({
      result: processedNotices,
      total,
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
        creator: { columns: { password: false } },
        noticesToTags: { with: { tag: true } },
        files: true,
      },
    });

    if (!notice) {
      return res.status(404).json({ message: "Notice not found." });
    }

    res.status(200).json(formatNoticeForResponse(notice));
  } catch (error) {
    console.error("Get notice by ID error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateNotice = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, tagIds, files: filesData } = req.body;
  const noticeId = parseInt(id, 10);

  const filesError = validateFilesInput(filesData);
  if (filesError) {
    return res.status(400).json({ message: filesError });
  }

  try {
    const updatedNotice = await db.transaction(async (tx) => {
      const [existingNotice] = await tx
        .select({ id: notices.id })
        .from(notices)
        .where(eq(notices.id, noticeId));

      if (!existingNotice) {
        throw new Error("NoticeNotFound");
      }

      const updatedData = {};
      if (title) updatedData.title = title;
      if (description) updatedData.description = description;
      if (date) updatedData.date = new Date(date);

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

      if (filesData !== undefined) {
        await tx
          .delete(files)
          .where(
            and(eq(files.entity_id, noticeId), eq(files.entity_type, "notice"))
          );
        if (filesData.length > 0) {
          const filesToInsert = filesData.map((file) => ({
            ...file,
            entity_id: noticeId,
            entity_type: "notice",
          }));
          await tx.insert(files).values(filesToInsert);
        }
      }

      return tx.query.notices.findFirst({
        where: eq(notices.id, noticeId),
        with: {
          creator: { columns: { password: false } },
          noticesToTags: { with: { tag: true } },
          files: true,
        },
      });
    });

    res.status(200).json({
      message: "Notice updated successfully",
      notice: formatNoticeForResponse(updatedNotice),
    });
  } catch (error) {
    if (error.message === "NoticeNotFound") {
      return res.status(404).json({ message: "Notice not found." });
    }
    console.error("Update notice error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteNotice = async (req, res) => {
  const { id } = req.params;
  const noticeId = parseInt(id, 10);

  try {
    await db.transaction(async (tx) => {
      await tx
        .delete(files)
        .where(
          and(eq(files.entity_id, noticeId), eq(files.entity_type, "notice"))
        );

      const [deletedNotice] = await tx
        .delete(notices)
        .where(eq(notices.id, noticeId))
        .returning();

      if (!deletedNotice) {
        throw new Error("NoticeNotFound");
      }
    });

    return res.status(200).json({ message: "Notice deleted successfully." });
  } catch (error) {
    if (error.message === "NoticeNotFound") {
      return res.status(404).json({ message: "Notice not found." });
    }
    console.error("Delete notice error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { createNotice, deleteNotice, getNotices, getNoticeById, updateNotice };
