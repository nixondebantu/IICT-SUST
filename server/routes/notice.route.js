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
import { assetUpload } from "../services/file.service.js";

const router = express.Router();

// Public route to get all notices
router.get("/", getNotices);

// Protected routes for managing notices
router.get(
  "/:id",
  validateJWT,
  rbacMiddleware("Notice"), // Assuming 'edit:Notice' permission
  getNoticeById
);

router.post(
  "/",
  validateJWT,
  rbacMiddleware("Notice"), // Assuming 'create:Notice' permission
  assetUpload.single("file"), // Use assetUpload for files like PDFs, field name "file"
  createNotice
);

router.put(
  "/:id",
  validateJWT,
  rbacMiddleware("Notice"), // Assuming 'edit:Notice' permission
  assetUpload.single("file"),
  updateNotice
);

router.delete(
  "/:id",
  validateJWT,
  rbacMiddleware("Notice"), // Assuming 'delete:Notice' permission
  deleteNotice
);

export default router;