import { eq, desc } from "drizzle-orm";
import { db } from "../db/index.js";
import { notices } from "../db/schemas/notice.schema.js";
import { cloudinary } from "../services/file.service.js";

const createNotice = async (req, res) => {
  const { title, description, date } = req.body;

  if (!title || !date) {
    return res.status(400).json({ message: "Title and date are required." });
  }

  try {
    let fileUrl = null;
    // A file is optional for a notice
    if (req.file) {
      fileUrl = req.file.path;
    }

    const newNotice = await db
      .insert(notices)
      .values({
        title,
        description,
        date: new Date(date), // Ensure date is stored as a proper date object
        file_url: fileUrl,
        creator_id: parseInt(req.user.id, 10),
      })
      .returning();

    res.status(201).json({
      message: "Notice created successfully",
      notice: newNotice[0],
    });
  } catch (error) {
    console.error("Create notice error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getNotices = async (req, res) => {
  try {
    // Order by date descending to show the newest notices first
    const noticesData = await db.select().from(notices).orderBy(desc(notices.date));
    res.status(200).json(noticesData);
  } catch (error) {
    console.error("Get notices error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getNoticeById = async (req, res) => {
  const { id } = req.params;
  try {
    const notice = await db
      .select()
      .from(notices)
      .where(eq(notices.id, parseInt(id, 10)))
      .limit(1);

    if (notice.length === 0) {
      return res.status(404).json({ message: "Notice not found." });
    }

    res.status(200).json(notice[0]);
  } catch (error) {
    console.error("Get notice by ID error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteNotice = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNotice = await db
      .delete(notices)
      .where(eq(notices.id, parseInt(id, 10)))
      .returning();

    if (deletedNotice.length === 0) {
      return res.status(404).json({ message: "Notice not found." });
    }

    // If the deleted notice had a file, remove it from Cloudinary
    const fileUrl = deletedNotice[0].file_url;
    if (fileUrl) {
      // Extract public ID from Cloudinary URL
      const publicId = fileUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    return res.status(200).json({ message: "Notice deleted successfully." });
  } catch (error) {
    console.error("Delete notice error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateNotice = async (req, res) => {
  const { id } = req.params;
  const { title, description, date } = req.body;

  try {
    const existingNotice = await db
      .select()
      .from(notices)
      .where(eq(notices.id, parseInt(id, 10)))
      .limit(1);

    if (existingNotice.length === 0) {
      return res.status(404).json({ message: "Notice not found." });
    }

    const updatedData = {};
    if (title) updatedData.title = title;
    if (description !== undefined) updatedData.description = description;
    if (date) updatedData.date = new Date(date);

    // Handle file update
    if (req.file) {
      // If a new file is uploaded, delete the old one first
      const oldFileUrl = existingNotice[0].file_url;
      if (oldFileUrl) {
        const publicId = oldFileUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }
      // Set the new file URL
      updatedData.file_url = req.file.path;
    }

    const updatedNotice = await db
      .update(notices)
      .set(updatedData)
      .where(eq(notices.id, parseInt(id, 10)))
      .returning();

    res.status(200).json({
      message: "Notice updated successfully",
      notice: updatedNotice[0],
    });
  } catch (error) {
    console.error("Update notice error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createNotice,
  deleteNotice,
  getNotices,
  getNoticeById,
  updateNotice,
};