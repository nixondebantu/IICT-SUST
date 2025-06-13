import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { noticesToTags } from "./notices_to_tags.schema.js";

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  value: text("value").unique().notNull(),
  type: text("type").notNull(),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  noticeToTags: many(noticesToTags),
}));
