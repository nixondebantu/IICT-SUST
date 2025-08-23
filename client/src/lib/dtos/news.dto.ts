// src/lib/dtos/news.dto.ts

import { z } from "zod";
import { createNewsValidator } from "../validators/news.validator";
import { CreatorRes } from "./notice.dto";
import { TagRes } from "./tag.dto";

// Type for the API response for a single news article
export type NewsRes = {
  id: number;
  title: string;
  content: string;
  image_url: string;
  date: string;
  created_at: string;
  creator: CreatorRes | null;
  tag: TagRes;
};

// Type for the request payload
export type NewsReq = z.infer<typeof createNewsValidator>;

// Response types for API operations
export type NewsCreateRes = {
  message: string;
  news: NewsRes;
};

export type NewsDeleteRes = {
  message: string;
};
