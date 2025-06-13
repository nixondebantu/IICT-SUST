import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.schema.js";
import { relations } from "drizzle-orm";

export const carousels = pgTable("carousels", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  image_url: text("image_url").notNull(),
  button_text: text("button_text"),
  button_link: text("button_link"),
  creator_id: integer("creator_id").references(() => users.id, {
    onDelete: "set null",
  }),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const carouselsRelations = relations(carousels, ({ one }) => ({
  creator: one(users, {
    fields: [carousels.creator_id],
    references: [users.id],
  }),
}));
