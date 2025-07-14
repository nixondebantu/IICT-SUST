import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.schema.js";
import { eq, relations } from "drizzle-orm";
import { files } from "./file.schema.js";
import { tags } from "./tags.schema.js";

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  start_time: timestamp("start_time").notNull(),
  end_time: timestamp("end_time").notNull(),
  location: text("location").notNull(),
  capacity: integer("capacity"),
  cta_title: text("cta_title").notNull(),
  cta_url: text("cta_url").notNull(),
  contact_number: text("contact_number"),
  contact_mail: text("contact_mail"),
  contact_person_name: text("contact_person"),
  imageUrl: text("image_url").notNull(),
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

export const eventsRelations = relations(events, ({ one, many }) => ({
  creator: one(users, {
    fields: [events.creator_id],
    references: [users.id],
  }),
  tags: one(tags, {
    fields: [events.tag_id],
    references: [tags.id],
  }),
  files: many(files, {
    condition: (filesTable, { parent }) => {
      return (
        eq(filesTable.entity_id, parent.id) &&
        eq(filesTable.entity_type, "event")
      );
    },
  }),
}));
