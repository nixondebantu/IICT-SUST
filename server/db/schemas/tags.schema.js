import { relations } from "drizzle-orm";
import { pgTable, serial, text, uniqueIndex } from "drizzle-orm/pg-core";
import { noticesToTags } from "./notices_to_tags.schema.js";

export const tags = pgTable(
  "tags",
  {
    id: serial("id").primaryKey(),
    value: text("value").notNull(),
    type: text("type").notNull(),
  },
  (table) => {
    return {
      uniqueTag: uniqueIndex("unique_tag_idx").on(table.value, table.type),
    };
  }
);

export const tagsRelations = relations(tags, ({ many }) => ({
  noticeToTags: many(noticesToTags),
}));
