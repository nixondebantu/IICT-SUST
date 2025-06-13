import express from "express";
import {
  createNotice,
  deleteNotice,
  getNoticeById,
  getNotices,
  updateNotice,
} from "../controllers/notice.controller.js";
import { validateJWT } from "../middleware/jwt.middleware.js";
import { rbacMiddleware } from "../middleware/rbac.middleware.js";

const router = express.Router();

router.get("/", getNotices);

router.get("/:id", getNoticeById);

router.post("/", validateJWT, rbacMiddleware("Notice"), createNotice);

router.put("/:id", validateJWT, rbacMiddleware("Notice"), updateNotice);

router.delete("/:id", validateJWT, rbacMiddleware("Notice"), deleteNotice);

export default router;
