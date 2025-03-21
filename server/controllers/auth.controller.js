import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { users } from "../db/schemas/users.schema.js";
import { comparePassword } from "../services/bcrypt.service.js";
import { signToken } from "../services/jwt.service.js";
import { userRoles } from "../db/schemas/userRoles.schema.js";
import { roles } from "../db/schemas/roles.schema.js";

export const loginUser = async (req, res) => {
  const { email, password, remember } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required." });
    return;
  }

  try {
    const user = await db.select().from(users).where(eq(users.email, email));
    if (user.length === 0) {
      res.status(404).json({ message: "User not found." });
      return;
    }
    const isPasswordValid = await comparePassword(password, user[0].password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password." });
      return;
    }

    const token = await signToken(
      { id: String(user[0].id) },
      remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24
    ); // 30 days or 1 day
    res.status(200).json({
      message: "Login successful",
      token,
      expireIn: remember ? 30 : 1,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProfile = async (req, res) => {
    const { id } = req.user;
    try {
        const result = await db.select().from(users)
            .where(eq(users.id, id))
            .leftJoin(userRoles, eq(users.id, userRoles.userId))
            .leftJoin(roles, eq(userRoles.roleId, roles.id));

        if (result.length > 0) {
            const user = result[0];
            const userData = {
                id: user.users.id,
                name: user.users.name,
                email: user.users.email,
                roles: []
            };

            result.forEach(item => {
                if (item.roles) {
                    userData.roles.push(item.roles.name);
                }
            });

            res.status(200).json({
                message: "Profile fetched successfully",
                user: userData
            });
        } else {
            res.status(404).json({
                message: "User not found"
            });
        }
    } catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
