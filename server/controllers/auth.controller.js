import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { users } from "../db/schemas/users.schema.js";
import { comparePassword } from "../services/bcrypt.service.js";
import { signToken } from "../services/jwt.service.js";

export const loginUser = async (req, res) => {
  const { email, password, remember } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = signToken(
      { id: String(user.id) },
      remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24
    );

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
    const userProfile = await db.query.users.findFirst({
      where: eq(users.id, parseInt(id, 10)),
      columns: {
        password: false,
      },
      with: {
        userRoles: {
          with: {
            role: {
              columns: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }
    const userData = {
      id: userProfile.id,
      name: userProfile.name,
      email: userProfile.email,
      roles: userProfile.userRoles.map((userRole) => userRole.role.name),
    };

    res.status(200).json({
      message: "Profile fetched successfully",
      user: userData,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
