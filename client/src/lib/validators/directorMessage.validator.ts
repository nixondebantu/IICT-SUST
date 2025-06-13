import { z } from "zod";

// Validator for data FROM the API
export const directorMessageValidator = z.object({
  id: z.number(),
  message: z.string(),
  name: z.string(),
  designation: z.string(),
  image_url: z.string().url().nullable().optional(),
  is_active: z.boolean(),
  creator_id: z.number().nullable(),
  created_at: z.string().datetime(),
});

// Validator for the form data we send TO the API
export const directorMessageFormValidator = z.object({
  message: z.string().min(20, { message: "Message must be at least 20 characters." }),
  name: z.string().min(3, { message: "Name is required." }),
  designation: z.string().min(3, { message: "Designation is required." }),
  image: z.instanceof(FileList).optional(),
  is_active: z.boolean().default(false).optional(),
});

export type DirectorMessageFormValues = z.infer<typeof directorMessageFormValidator>;