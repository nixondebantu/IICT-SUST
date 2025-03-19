import { eq } from "drizzle-orm";
import { RequestHandler } from "express";
import { db } from "../db";
import { users } from "../db/schemas/users.schema";
import { comparePasswords } from "../services/bcrypt.service";
import { signToken } from "../services/jwt.service";

const loginUser: RequestHandler = async (req, res) => {
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

    const isPasswordValid = await comparePasswords(password, user[0].password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password." });
      return;
    }

    const token = await signToken(
      { id: String(user[0].id) },
      remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24
    ); // 30 days or 1 day
    res
      .status(200)
      .json({
        message: "Login successful",
        token,
        expireIn: remember ? 30 : 1,
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { loginUser };
