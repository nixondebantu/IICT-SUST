import { z } from "zod";

export const carouselSlideValidator = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image_url: z.string().url("Invalid image URL format"),
  button_text: z.string().nullable().optional(),
  button_link: z.string().nullable().optional(),
  creator_id: z.number(),
  created_at: z.string().datetime("Invalid date format"),
});

export const carouselSlidesValidator = z.array(carouselSlideValidator);
// Base schema for common fields
const baseCarouselFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().optional(),
  button_text: z.string().optional(),
  button_link: z.string().optional(),
});


// Validator for CREATING a slide (image is required)
export const createCarouselValidator = baseCarouselFormSchema.extend({
  image: z
    .instanceof(FileList)
    .refine((files) => files?.length > 0, "An image is required."),
});


// Validator for UPDATING a slide (image is optional)
export const updateCarouselValidator = baseCarouselFormSchema.extend({
  image: z
    .instanceof(FileList)
    .optional(),
});

// Type for form values
export type CarouselFormValues = z.infer<typeof baseCarouselFormSchema> & {
  image?: FileList;
};


