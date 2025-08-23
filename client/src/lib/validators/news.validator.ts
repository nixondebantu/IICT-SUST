import { z } from "zod";

// Validator for creating/updating a news article
export const createNewsValidator = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  image_url: z.string().url("A valid image URL is required"),
  date: z.date({ message: "A valid date is required" }),
  tag_id: z.number({ message: "A news category (tag) is required" }),
});
