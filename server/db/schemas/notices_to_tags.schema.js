import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { notices } from "./notice.schema.js";
import { tags } from "./tags.schema.js";
import { relations } from "drizzle-orm";

export const noticesToTags = pgTable(
  "notices_to_tags",
  {
    notice_id: integer("notice_id")
      .notNull()
      .references(() => notices.id, {
        onDelete: "cascade",
      }),
    tag_id: integer("tag_id")
      .notNull()
      .references(() => tags.id, {
        onDelete: "cascade",
      }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.notice_id, t.tag_id] }),
  })
);

export const noticesToTagsRelations = relations(noticesToTags, ({ one }) => ({
  notice: one(notices, {
    fields: [noticesToTags.notice_id],
    references: [notices.id],
  }),
  tag: one(tags, {
    fields: [noticesToTags.tag_id],
    references: [tags.id],
  }),
}));
