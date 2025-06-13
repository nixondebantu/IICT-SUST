import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { tags } from "../db/schemas/tags.schema.js";

export const createTag = async (req, res) => {
  const { value, type } = req.body;

  if (!value || !type) {
    return res
      .status(400)
      .json({ message: "Tag 'value' and 'type' are required." });
  }

  try {
    const [newTag] = await db
      .insert(tags)
      .values({
        value: value.trim(),
        type: type.trim(),
      })
      .returning();

    res.status(201).json({
      message: "Tag created successfully",
      tag: newTag,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res
        .status(409)
        .json({ message: `Tag with value '${value}' already exists.` });
    }
    console.error("Create tag error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTags = async (req, res) => {
  const { type } = req.query;
  try {
    const allTags = await db.query.tags.findMany({
      where: type ? eq(tags.type, type) : undefined,
    });
    res.status(200).json(allTags);
  } catch (error) {
    console.error("Get tags error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
