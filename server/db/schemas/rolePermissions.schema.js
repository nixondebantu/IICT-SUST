import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { roles } from "./roles.schema.js";
import { permissions } from "./permissions.schema.js";

export const rolePermissions = pgTable(
  "role_permissions",
  {
    roleId: integer("role_id").references(() => roles.id, {
      onDelete: "cascade",
    }),
    permissionId: integer("permission_id").references(() => permissions.id, {
      onDelete: "cascade",
    }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.roleId, t.permissionId] }),
  })
);
