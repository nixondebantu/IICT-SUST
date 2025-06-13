import { eq, and, inArray } from "drizzle-orm";
import { db } from "../db/index.js";
import { rolePermissions } from "../db/schemas/rolePermissions.schema.js";
import { userRoles } from "../db/schemas/userRoles.schema.js";
import { permissions } from "../db/schemas/permissions.schema.js";
import { users } from "../db/schemas/users.schema.js";

const checkPermission = async (requiredPermissions, userId) => {
  try {
    const result = await db
      .select({ id: users.id })
      .from(users)
      .leftJoin(userRoles, eq(users.id, userRoles.userId))
      .leftJoin(rolePermissions, eq(userRoles.roleId, rolePermissions.roleId))
      .leftJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
      .where(
        and(
          eq(users.id, userId),
          inArray(permissions.name, requiredPermissions)
        )
      )
      .limit(1);

    return result.length > 0;
  } catch (error) {
    console.error("Error in permission check:", error);
    throw error;
  }
};

export const rbacMiddleware =
  (...requiredPermissions) =>
  async (req, res, next) => {
    if (requiredPermissions.length === 0) {
      console.warn(
        "RBAC middleware called with no required permissions. Access denied by default."
      );
      return res.status(403).json({
        message:
          "Forbidden: Access control for this route is not configured correctly.",
      });
    }

    const userId = parseInt(req.user.id, 10);

    try {
      const hasPermission = await checkPermission(requiredPermissions, userId);

      if (!hasPermission) {
        return res.status(403).json({
          message:
            "Forbidden: You do not have the required permission to perform this action.",
        });
      }

      next();
    } catch (error) {
      console.error("Error in RBAC middleware:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
