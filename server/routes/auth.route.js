import express from "express";
const router = express.Router();
import { loginUser, getProfile } from "../controllers/auth.controller.js";
import { validateJWT } from "../middleware/jwt.middleware.js";

router.post("/login", loginUser);
router.get("/profile",validateJWT, getProfile);

export default router;