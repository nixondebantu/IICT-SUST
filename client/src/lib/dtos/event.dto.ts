// src/lib/dtos/event.dto.ts

import { z } from "zod";
import { FileRes } from "./file.dto";
import { TagRes } from "./tag.dto";
import { CreatorRes } from "./notice.dto"; // Reusing from notice.dto
import { createEventValidator } from "../validators/event.validator";

// Type for the API response for a single event
export type EventRes = {
  id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  location: string;
  capacity: number | null;
  cta_title: string | null;
  cta_url: string | null;
  contact_number: string | null;
  contact_mail: string | null;
  contact_person_name: string | null;
  imageUrl: string;
  created_at: string;
  creator_id: number;
  creator: CreatorRes | null;
  tag: TagRes;
  files: FileRes[];
};

// Type for the request payload when creating/updating an event
export type EventReq = z.infer<typeof createEventValidator>;

// Response types for API operations
export type EventCreateRes = {
  message: string;
  event: EventRes;
};

export type EventDeleteRes = {
  message: string;
};
