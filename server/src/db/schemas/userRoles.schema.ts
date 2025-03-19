import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { roles } from "./roles.schema";
import { users } from "./users.schema";

export const userRoles = pgTable(
  "user_roles",
  {
    userId: integer("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    roleId: integer("role_id").references(() => roles.id, {
      onDelete: "cascade",
    }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.roleId] }), // Composite primary key
  })
);
