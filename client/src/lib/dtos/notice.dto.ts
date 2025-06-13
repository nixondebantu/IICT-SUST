import { z } from "zod";
import { noticeValidator } from "../validators/notice.validator";

// This type represents a single notice from the API
export type Notice = z.infer<typeof noticeValidator>;