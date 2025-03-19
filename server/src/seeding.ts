import bcrypt from "bcrypt";
import { eq } from "drizzle-orm"; // Import eq function
import { db } from "./db"; // Your Drizzle database instance
import { permissions } from "./db/schemas/permissions.schema";
import { rolePermissions } from "./db/schemas/rolePermissions.schema";
import { roles } from "./db/schemas/roles.schema";
import { userRoles } from "./db/schemas/userRoles.schema";
import { users } from "./db/schemas/users.schema";

async function seedRolesAndPermissions() {
  const directorRole = await db
    .insert(roles)
    .values({ name: "director" })
    .returning();
  const accountantRole = await db
    .insert(roles)
    .values({ name: "accountant" })
    .returning();

  const createCarouselPermission = await db
    .insert(permissions)
    .values({ name: "create:Carousel" })
    .returning();
  const editCarouselPermission = await db
    .insert(permissions)
    .values({ name: "edit:Carousel" })
    .returning();
  const deleteCarouselPermission = await db
    .insert(permissions)
    .values({ name: "delete:Carousel" })
    .returning();

  await db.insert(rolePermissions).values([
    {
      roleId: directorRole[0].id,
      permissionId: createCarouselPermission[0].id,
    },
    { roleId: directorRole[0].id, permissionId: editCarouselPermission[0].id },
    {
      roleId: directorRole[0].id,
      permissionId: deleteCarouselPermission[0].id,
    },
  ]);

  console.log("Roles and permissions seeded");
  seedUsersAndRoles();
}

async function seedUsersAndRoles() {
  const password = await bcrypt.hash("password1", 10);
  const user1 = await db
    .insert(users)
    .values({
      email: "admin@example.com",
      name: "Admin",
      password: password,
    })
    .returning();

  const directorRole = await db
    .select()
    .from(roles)
    .where(eq(roles.name, "director"));

  await db.insert(userRoles).values({
    userId: user1[0].id,
    roleId: directorRole[0].id,
  });

  console.log("User and roles seeded");
}
seedRolesAndPermissions();
