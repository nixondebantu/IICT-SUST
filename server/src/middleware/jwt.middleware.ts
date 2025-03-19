import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization token is required." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.jwt.secret!);
    if (typeof decoded === "object" && "id" in decoded) {
      req.user = decoded as { id: string };
    } else {
      return res.status(401).json({ message: "Invalid token payload" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" }); // Unauthorized
  }
};
