import { eq, ne, desc } from "drizzle-orm";
import { db } from "../db/index.js";
import { directorMessages } from "../db/schemas/director_message.schema.js";
import { cloudinary } from "../services/file.service.js";

/**
 * Creates a new director message. If `is_active` is true,
 * it deactivates all other messages.
 */
const createDirectorMessage = async (req, res) => {
  const { message, name, designation, is_active } = req.body;

  if (!message || !name || !designation) {
    return res.status(400).json({ message: "Message, name, and designation are required." });
  }

  try {
    // If the new message is set to active, deactivate all others first.
    if (is_active && is_active.toString() === 'true') {
      await db.update(directorMessages).set({ is_active: false });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = req.file.path;
    }

    const newMessage = await db
      .insert(directorMessages)
      .values({
        message,
        name,
        designation,
        image_url: imageUrl,
        is_active: is_active ? is_active.toString() === 'true' : false,
        creator_id: parseInt(req.user.id, 10),
      })
      .returning();

    res.status(201).json({
      message: "Director message created successfully",
      directorMessage: newMessage[0],
    });
  } catch (error) {
    console.error("Create director message error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Gets all director messages, ordered by creation date.
 */
const getDirectorMessages = async (req, res) => {
  try {
    const messages = await db.select().from(directorMessages).orderBy(desc(directorMessages.created_at));
    res.status(200).json(messages);
  } catch (error) {
    console.error("Get director messages error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Gets a single director message by its ID.
 */
const getDirectorMessageById = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await db
      .select()
      .from(directorMessages)
      .where(eq(directorMessages.id, parseInt(id, 10)))
      .limit(1);

    if (message.length === 0) {
      return res.status(404).json({ message: "Director message not found." });
    }

    res.status(200).json(message[0]);
  } catch (error) {
    console.error("Get director message by ID error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Deletes a director message and its associated image from Cloudinary.
 */
const deleteDirectorMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMessage = await db
      .delete(directorMessages)
      .where(eq(directorMessages.id, parseInt(id, 10)))
      .returning();

    if (deletedMessage.length === 0) {
      return res.status(404).json({ message: "Director message not found." });
    }

    const imageUrl = deletedMessage[0].image_url;
    if (imageUrl) {
      const publicId = imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    return res.status(200).json({ message: "Director message deleted successfully." });
  } catch (error) {
    console.error("Delete director message error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Updates a director message. If `is_active` is set to true,
 * it deactivates all other messages.
 */
const updateDirectorMessage = async (req, res) => {
  const { id } = req.params;
  const { message, name, designation, is_active } = req.body;

  try {
    const existingMessage = await db
      .select()
      .from(directorMessages)
      .where(eq(directorMessages.id, parseInt(id, 10)))
      .limit(1);

    if (existingMessage.length === 0) {
      return res.status(404).json({ message: "Director message not found." });
    }

    // If this message is being set to active, deactivate all *other* messages.
    if (is_active && is_active.toString() === 'true') {
      await db.update(directorMessages).set({ is_active: false }).where(ne(directorMessages.id, parseInt(id, 10)));
    }

    const updatedData = {};
    if (message) updatedData.message = message;
    if (name) updatedData.name = name;
    if (designation) updatedData.designation = designation;
    if (is_active !== undefined) updatedData.is_active = is_active.toString() === 'true';

    if (req.file) {
      const oldImageUrl = existingMessage[0].image_url;
      if (oldImageUrl) {
        const publicId = oldImageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }
      updatedData.image_url = req.file.path;
    }

    const updatedMessage = await db
      .update(directorMessages)
      .set(updatedData)
      .where(eq(directorMessages.id, parseInt(id, 10)))
      .returning();

    res.status(200).json({
      message: "Director message updated successfully",
      directorMessage: updatedMessage[0],
    });
  } catch (error) {
    console.error("Update director message error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createDirectorMessage,
  getDirectorMessages,
  getDirectorMessageById,
  updateDirectorMessage,
  deleteDirectorMessage,
};