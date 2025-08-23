import { z } from "zod";

export const createEventValidator = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  start_time: z.date({ message: "Start date is required" }),
  end_time: z.date({ message: "End date is required" }),
  location: z.string().min(1, "Location is required"),
  imageUrl: z.string().url("A valid image URL is required"),
  capacity: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce
      .number({ invalid_type_error: "Capacity must be a number" })
      .positive("Capacity must be a positive number")
      .optional()
  ),
  cta_title: z.string().optional(),
  cta_url: z.string().url().optional(),
  contact_number: z.string().optional(),
  contact_mail: z.string().email().optional(),
  contact_person_name: z.string().optional(),
  tag_id: z.number({ message: "Tag is required" }),
  files: z
    .array(
      z.object({
        title: z.string().min(1, "File title is required"),
        url: z.string().url("Invalid file URL"),
      })
    )
    .optional(),
});
