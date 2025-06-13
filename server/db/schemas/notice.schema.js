import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users.schema.js";
import { relations, eq } from "drizzle-orm";
import { noticesToTags } from "./notices_to_tags.schema.js";
import { files } from "./file.schema.js";

export const notices = pgTable("notices", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  creator_id: integer("creator_id").references(() => users.id, {
    onDelete: "set null",
  }),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const noticesRelations = relations(notices, ({ one, many }) => ({
  creator: one(users, {
    fields: [notices.creator_id],
    references: [users.id],
  }),
  noticesToTags: many(noticesToTags),
  files: many(files, {
    condition: (filesTable, { parent }) => {
      return (
        eq(filesTable.entity_id, parent.id) &&
        eq(filesTable.entity_type, "notice")
      );
    },
  }),
}));
