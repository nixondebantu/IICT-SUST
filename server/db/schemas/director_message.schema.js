import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.schema.js";
import { relations } from "drizzle-orm";

export const directorMessages = pgTable("director_messages", {
  id: serial("id").primaryKey(),
  message: text("message").notNull(),
  creator_id: integer("creator_id").references(() => users.id, {
    onDelete: "set null",
  }),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const directorMessagesRelations = relations(
  directorMessages,
  ({ one }) => ({
    creator: one(users, {
      fields: [directorMessages.creator_id],
      references: [users.id],
    }),
  })
);
