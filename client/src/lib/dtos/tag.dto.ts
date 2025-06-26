import { z } from "zod";

export type TagRes = {
  id: number;
  value: string;
  type: string; // "notice" | "task" | "project" | "issue" | "ticket";
};

export const TagCreateValidator = z.object({
  value: z.string().min(1, "Tag value is required"),
  type: z.enum(["notice", "news"]),
});

export type TagReq = z.infer<typeof TagCreateValidator>;

export type TagCreateRes = {
  message: string;
  tag: TagRes;
};
