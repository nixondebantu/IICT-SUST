import { pgTable, text } from "drizzle-orm/pg-core";

import * as t from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
});
