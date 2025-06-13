import { relations } from "drizzle-orm";
import { pgTable, text, integer } from "drizzle-orm/pg-core";
import { userRoles } from "./userRoles.schema.js";
import { carousels } from "./carousels.schema.js";
import { directorMessages } from "./director_message.schema.js";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  userRoles: many(userRoles),
  carousels: many(carousels),
  directorMessages: many(directorMessages),
}));
