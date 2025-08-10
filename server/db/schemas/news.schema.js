import {
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users.schema.js";
import { relations } from "drizzle-orm";
import { tags } from "./tags.schema.js";

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  image_url: text("image_url").notNull(),
  date: date("date").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  creator_id: integer("creator_id").references(() => users.id, {
    onDelete: "set null",
  }),
  tag_id: integer("tag_id")
    .notNull()
    .references(() => tags.id, {
      onDelete: "cascade",
    }),
});

export const newsRelations = relations(news, ({ one }) => ({
  creator: one(users, {
    fields: [news.creator_id],
    references: [users.id],
  }),
  tags: one(tags, {
    fields: [news.tag_id],
    references: [tags.id],
  }),
}));
