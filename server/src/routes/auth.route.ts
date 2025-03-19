import express from "express";
import { loginUser } from "../controllers/auth.controller";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the auth route." });
});

router.post("/login", loginUser);

export default router;
