import express from "express";
import { createTag, getTags } from "../controllers/tag.controller.js";
import { validateJWT } from "../middleware/jwt.middleware.js";
import { rbacMiddleware } from "../middleware/rbac.middleware.js";

const router = express.Router();

router.get("/", getTags);
router.post("/", validateJWT, rbacMiddleware("Notice"), createTag);

export default router;
