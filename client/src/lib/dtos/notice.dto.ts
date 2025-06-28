import { z } from "zod";
import { createNoticeValidator } from "../validators/notice.validator";
import { FileRes } from "./file.dto";
import { TagRes } from "./tag.dto";

export type CreatorRes = {
  id: number;
  name: string;
  email: string;
};

export type NoticeRes = {
  id: number;
  title: string;
  description: string;
  date: string;
  creator_id: number;
  creator: CreatorRes;
  tags: TagRes[];
  files: FileRes[];
};

export type NoticeCreateRes = {
  message: string;
  notice: NoticeRes;
};

export type NoticeDeleteRes = {
  message: string;
};

export type NoticeReq = z.infer<typeof createNoticeValidator>;
