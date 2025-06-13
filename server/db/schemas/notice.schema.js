import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users.schema.js";
import { relations } from "drizzle-orm";
import { noticesToTags } from "./notices_to_tags.schema.js";

export const notices = pgTable("notices", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  short_description: varchar("short_description", { length: 255 }).notNull(),
  date: timestamp("date").notNull(),
  file_url: text("file_url").array(),
  creator_id: integer("creator_id").references(() => users.id, {
    onDelete: "set null", // If the user is deleted, the notice remains but creator is null
  }),

  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const noticesRelations = relations(notices, ({ one, many }) => ({
  creator: one(users, {
    fields: [notices.creator_id],
    references: [users.id],
  }),
  noticesToTags: many(noticesToTags),
}));
