import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.schema.js";

export const notices = pgTable("notices", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  

  date: timestamp("date").notNull(),

  /**
   * Optional: A URL to an associated file (e.g., a PDF).
   */
  file_url: text("file_url"),


  creator_id: integer("creator_id").references(() => users.id, {
    onDelete: "set null", // If the user is deleted, the notice remains but creator is null
  }),
  
  created_at: timestamp("created_at").notNull().defaultNow(),
});