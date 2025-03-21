import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { rolePermissions } from "../db/schemas/rolePermissions.schema.js";
import { userRoles } from "../db/schemas/userRoles.schema.js";
import { permissions } from "../db/schemas/permissions.schema.js";
import { users } from "../db/schemas/users.schema.js";

const checkPermission = async (permissionTitle, userId) => {
    try {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .leftJoin(userRoles, eq(users.id, userRoles.userId))
        .leftJoin(rolePermissions, eq(userRoles.roleId, rolePermissions.roleId))
        .leftJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
        .where(eq(permissions.name, permissionTitle))
        .limit(1);
      return result.length > 0;
    } catch (error) {
      console.error("Error in permission check:", error);
      throw error;
    }
  };  

export const rbacMiddleware = (permissionTitle) => async (req, res, next) => {
  const userId = req.user.id;

  try {
    const hasPermission = await checkPermission(permissionTitle, userId);

    if (!hasPermission) {
      return res
        .status(403)
        .json({
          message: "Forbidden: You do not have the required permission",
        });
    }

    next();
  } catch (error) {
    console.error("Error in RBAC middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
