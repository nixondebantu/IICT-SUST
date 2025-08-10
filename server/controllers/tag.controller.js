import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { tags } from "../db/schemas/tags.schema.js";
import { TagType } from "../shared/enums/tag-types.enum.js";
import { news } from "../db/schemas/news.schema.js";
import { noticesToTags } from "../db/schemas/notices_to_tags.schema.js";
import { events } from "../db/schemas/event.schema.js";

export const createTag = async (req, res) => {
  const { value, type } = req.body;

  if (!value || !type) {
    return res
      .status(400)
      .json({ message: "Tag 'value' and 'type' are required." });
  }

  if (
    type !== TagType.News &&
    type !== TagType.Event &&
    type !== TagType.Notice
  ) {
    return res.status(400).json({ message: "Invalid tag type." });
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

export const deleteTag = async (req, res) => {
  const { id } = req.params;
  const tagId = parseInt(id, 10);

  if (isNaN(tagId)) {
    return res.status(400).json({ message: "Invalid tag ID." });
  }

  try {
    // Check if the tag exists
    const [tagToDelete] = await db
      .select()
      .from(tags)
      .where(eq(tags.id, tagId));

    if (!tagToDelete) {
      return res.status(404).json({ message: "Tag not found." });
    }

    // Check for associations with news
    const newsWithTag = await db.query.news.findFirst({
      where: eq(news.tag_id, tagId),
    });

    if (newsWithTag) {
      return res
        .status(409)
        .json({
          message: "Tag is associated with a news item and cannot be deleted.",
        });
    }

    // Check for associations with notices
    const noticeWithTag = await db.query.noticesToTags.findFirst({
      where: eq(noticesToTags.tag_id, tagId),
    });

    if (noticeWithTag) {
      return res
        .status(409)
        .json({
          message: "Tag is associated with a notice and cannot be deleted.",
        });
    }

    // Check for associations with events
    const eventWithTag = await db.query.events.findFirst({
      where: eq(events.tag_id, tagId),
    });

    if (eventWithTag) {
      return res
        .status(409)
        .json({
          message: "Tag is associated with an event and cannot be deleted.",
        });
    }

    await db.delete(tags).where(eq(tags.id, tagId));

    res.status(200).json({ message: "Tag deleted successfully." });
  } catch (error) {
    console.error("Delete tag error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
