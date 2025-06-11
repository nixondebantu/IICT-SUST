import { z } from "zod";
import {  carouselSlideValidator } from "../validators/carousel.validator";

// This type represents a single carousel slide from the API
export type CarouselSlide = z.infer<typeof carouselSlideValidator>;
// export type CreateCarouselSlideReq = z.infer<typeof carouselFormValidator>;
