import { z } from "zod";

export const createNoticeValidator = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.date().default(() => new Date()),
  tagIds: z.array(z.number()).optional(),
  files: z
    .array(
      z.object({
        title: z.string().min(1, "File title is required"),
        url: z.string().url("Invalid file URL"),
      })
    )
    .optional(),
});
