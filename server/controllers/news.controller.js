import { eq, desc, asc, and, or, gte, lte, ilike, count } from "drizzle-orm";
import { db } from "../db/index.js";
import { news } from "../db/schemas/news.schema.js";

const formatNewsForResponse = (item) => {
  if (!item) return null;
  const creator = item.creator
    ? {
        id: item.creator.id,
        name: item.creator.name,
        email: item.creator.email,
      }
    : null;
  return {
    id: item.id,
    title: item.title,
    content: item.content,
    image_url: item.image_url,
    date: item.date?.toISOString?.() ?? item.date,
    created_at: item.created_at?.toISOString?.() ?? item.created_at,
    creator_id: item.creator_id,
    creator,
    tag: item.tags
      ? {
          id: item.tags.id,
          value: item.tags.value,
          type: item.tags.type,
        }
      : null,
  };
};

const createNews = async (req, res) => {
  const { title, content, image_url, date, tag_id } = req.body;
  if (!title || !content || !image_url || !date || !tag_id) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  try {
    const [createdNews] = await db
      .insert(news)
      .values({
        title,
        content,
        image_url,
        date: new Date(date),
        creator_id: parseInt(req.user.id, 10),
        tag_id: parseInt(tag_id, 10),
      })
      .returning();
    const result = await db.query.news.findFirst({
      where: eq(news.id, createdNews.id),
      with: {
        creator: { columns: { password: false } },
        tags: true,
      },
    });
    res.status(201).json({
      message: "News created successfully",
      news: formatNewsForResponse(result),
    });
  } catch (error) {
    console.error("Create news error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getNews = async (req, res) => {
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
        or(ilike(news.title, searchKeyword), ilike(news.content, searchKeyword))
      );
    }
    if (startDate) {
      conditions.push(gte(news.date, new Date(startDate)));
    }
    if (endDate) {
      conditions.push(lte(news.date, new Date(endDate)));
    }
    if (tag) {
      const tagId = parseInt(tag, 10);
      conditions.push(eq(news.tag_id, tagId));
    }
    const finalConditions = conditions.length ? and(...conditions) : undefined;
    const [totalResult, newsData] = await Promise.all([
      db.select({ total: count() }).from(news).where(finalConditions),
      db.query.news.findMany({
        where: finalConditions,
        orderBy:
          sortBy === "date"
            ? order === "asc"
              ? [asc(news.date)]
              : [desc(news.date)]
            : [desc(news.created_at)],
        limit: limitNumber,
        offset: offset,
        with: {
          tags: true,
        },
      }),
    ]);
    const processedNews = newsData.map((item) => {
      const formatted = formatNewsForResponse(item);
      if (formatted.title && formatted.title.length > 100) {
        formatted.title = formatted.title.slice(0, 100) + " ...";
      }
      if (formatted.content) {
        const words = formatted.content.split(" ");
        if (words.length > 20) {
          formatted.content = words.slice(0, 20).join(" ") + " ...";
        }
      }
      return formatted;
    });
    const total = totalResult[0].total;
    const totalPages = Math.ceil(total / limitNumber);
    res.status(200).json({
      result: processedNews,
      total,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error("Get news error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getNewsById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await db.query.news.findFirst({
      where: eq(news.id, parseInt(id, 10)),
      with: {
        creator: { columns: { password: false } },
        tags: true,
      },
    });
    if (!item) {
      return res.status(404).json({ message: "News not found." });
    }
    res.status(200).json(formatNewsForResponse(item));
  } catch (error) {
    console.error("Get news by ID error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, content, image_url, date, tag_id } = req.body;
  const newsId = parseInt(id, 10);
  try {
    const [existingNews] = await db
      .select({ id: news.id })
      .from(news)
      .where(eq(news.id, newsId));
    if (!existingNews) {
      return res.status(404).json({ message: "News not found." });
    }
    const updatedData = {};
    if (title) updatedData.title = title;
    if (content) updatedData.content = content;
    if (image_url) updatedData.image_url = image_url;
    if (date) updatedData.date = new Date(date);
    if (tag_id) updatedData.tag_id = parseInt(tag_id, 10);
    if (Object.keys(updatedData).length > 0) {
      await db.update(news).set(updatedData).where(eq(news.id, newsId));
    }
    const result = await db.query.news.findFirst({
      where: eq(news.id, newsId),
      with: {
        creator: { columns: { password: false } },
        tags: true,
      },
    });
    res.status(200).json({
      message: "News updated successfully",
      news: formatNewsForResponse(result),
    });
  } catch (error) {
    console.error("Update news error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteNews = async (req, res) => {
  const { id } = req.params;
  const newsId = parseInt(id, 10);
  try {
    const [deletedNews] = await db
      .delete(news)
      .where(eq(news.id, newsId))
      .returning();
    if (!deletedNews) {
      return res.status(404).json({ message: "News not found." });
    }
    return res.status(200).json({ message: "News deleted successfully." });
  } catch (error) {
    console.error("Delete news error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { createNews, getNews, getNewsById, updateNews, deleteNews };
