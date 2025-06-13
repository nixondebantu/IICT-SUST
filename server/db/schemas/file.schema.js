import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { notices } from "./notice.schema.js";

export const files = pgTable("files", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  url: text("url").notNull(),
  entity_id: integer("entity_id").notNull(),
  entity_type: varchar("entity_type", { length: 50 }).notNull(), // e.g., "notice", "user", etc.
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const filesRelations = relations(files, ({ one }) => ({
  notice: one(notices, {
    fields: [files.entity_id],
    references: [notices.id],
  }),
}));
