import { integer, pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { users } from "./users.schema.js";

/**
 * This table stores messages from the director.
 * The application should typically query for the single message where `is_active` is true.
 */
export const directorMessages = pgTable("director_messages", {
  id: serial("id").primaryKey(),

  // Core Fields from your example
  /** The main body of the welcome message. */
  message: text("message").notNull(),
  name: text("name").notNull(),
  designation: text("designation").notNull(),


  image_url: text("image_url"),

  /** 
   * A flag to determine which message is currently live on the site.
   * This allows preparing a new message without it going live immediately.
   */
  is_active: boolean("is_active").default(false).notNull(),

  // Auditing and Relationship Fields
  creator_id: integer("creator_id").references(() => users.id, {
    onDelete: "set null",
  }),
  created_at: timestamp("created_at").notNull().defaultNow(),
});