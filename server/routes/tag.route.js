import express from "express";
import {
  createTag,
  deleteTag,
  getTags,
} from "../controllers/tag.controller.js";
import { validateJWT } from "../middleware/jwt.middleware.js";
import { rbacMiddleware } from "../middleware/rbac.middleware.js";

const router = express.Router();

router.get("/", getTags);
router.post("/", validateJWT, rbacMiddleware("Notice"), createTag);
router.delete("/:id", validateJWT, rbacMiddleware("Notice"), deleteTag);

export default router;
