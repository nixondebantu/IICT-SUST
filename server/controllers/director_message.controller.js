import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { directorMessages } from "../db/schemas/director_message.schema.js";

export const createMessage = async (req, res) => {
  const { message } = req.body;
  const creatorId = parseInt(req.user.id, 10);

  if (!message) {
    return res.status(400).json({ message: "A 'message' is required." });
  }

  try {
    const existingMessage = await db.query.directorMessages.findFirst();

    if (existingMessage) {
      return res.status(409).json({
        message: `A message already exists. Use the PUT /director-message/${existingMessage.id} route to update it.`,
      });
    }

    const [newMessage] = await db
      .insert(directorMessages)
      .values({
        message,
        creator_id: creatorId,
      })
      .returning();

    const messageData = await db.query.directorMessages.findFirst({
      where: eq(directorMessages.id, newMessage.id),
      with: {
        creator: {
          columns: { name: true, email: true },
        },
      },
    });

    res.status(201).json({
      message: "Director's message created successfully.",
      data: messageData,
    });
  } catch (error) {
    console.error("Create director message error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const messageData = await db.query.directorMessages.findFirst({
      with: {
        creator: {
          columns: { name: true, email: true },
        },
      },
    });

    if (!messageData) {
      return res.status(404).json({ message: "Director's message not found." });
    }

    res.status(200).json(messageData);
  } catch (error) {
    console.error("Get director message error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessageById = async (req, res) => {
  const { id } = req.params;
  try {
    const messageData = await db.query.directorMessages.findFirst({
      where: eq(directorMessages.id, parseInt(id, 10)),
      with: {
        creator: {
          columns: { name: true, email: true },
        },
      },
    });

    if (!messageData) {
      return res.status(404).json({ message: "Director's message not found." });
    }

    res.status(200).json(messageData);
  } catch (error) {
    console.error("Get director message by ID error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateMessage = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  const creatorId = parseInt(req.user.id, 10);

  if (!message) {
    return res.status(400).json({ message: "A 'message' is required." });
  }

  try {
    const [updatedMessage] = await db
      .update(directorMessages)
      .set({
        message,
        creator_id: creatorId, // Update the creator to track who last edited it
      })
      .where(eq(directorMessages.id, parseInt(id, 10)))
      .returning();

    if (!updatedMessage) {
      return res.status(404).json({ message: "Director's message not found." });
    }

    const messageData = await db.query.directorMessages.findFirst({
      where: eq(directorMessages.id, updatedMessage.id),
      with: {
        creator: {
          columns: { name: true, email: true },
        },
      },
    });

    res.status(200).json({
      message: "Director's message updated successfully.",
      data: messageData,
    });
  } catch (error) {
    console.error("Update director message error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
