import { z } from "zod";

// Validator for the data coming FROM the API
export const noticeValidator = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable().optional(),
  date: z.string().datetime(), // The backend sends a string in ISO format
  file_url: z.string().url().nullable().optional(),
  creator_id: z.number().nullable(),
  created_at: z.string().datetime(),
});

// Validator for the form data we send TO the API
export const noticeFormValidator = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().optional(),
  // For shadcn/ui date picker, the value is a Date object
  date: z.date({
    required_error: "A date for the notice is required.",
  }),
  // File is optional for both create and update
  file: z.instanceof(FileList).optional(),
});

export type NoticeFormValues = z.infer<typeof noticeFormValidator>;