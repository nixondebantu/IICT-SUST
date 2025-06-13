import { z } from "zod";

// Validator for data FROM the API
export const directorMessageValidator = z.object({
  id: z.number(),
  message: z.string(),
  creator_id: z.number().nullable(),
  created_at: z.string().datetime(),
  // The creator is now a nested object
  creator: z
    .object({
      name: z.string(),
      email: z.string(),
    })
    .nullable(),
});

// Validator for the form data we send TO the API (much simpler now)
export const directorMessageFormValidator = z.object({
  message: z
    .string()
    .min(20, { message: "Message must be at least 20 characters." }),
});

export type DirectorMessageFormValues = z.infer<
  typeof directorMessageFormValidator
>;