import express from "express";
import {
  createDirectorMessage,
  deleteDirectorMessage,
  getDirectorMessageById,
  getDirectorMessages,
  updateDirectorMessage,
} from "../controllers/director_message.controller.js";
import { validateJWT } from "../middleware/jwt.middleware.js";
import { rbacMiddleware } from "../middleware/rbac.middleware.js";
import { imageUpload } from "../services/file.service.js";

const router = express.Router();

// A public route to get the currently active message could be added here if needed
// For now, all routes are protected for the admin panel.

router.get("/", validateJWT, rbacMiddleware("DirectorMessage"), getDirectorMessages);

router.get("/:id", validateJWT, rbacMiddleware("DirectorMessage"), getDirectorMessageById);

router.post(
  "/",
  validateJWT,
  rbacMiddleware("DirectorMessage"),
  imageUpload.single("image"), // Use 'image' as the field name for the photo
  createDirectorMessage
);

router.put(
  "/:id",
  validateJWT,
  rbacMiddleware("DirectorMessage"),
  imageUpload.single("image"),
  updateDirectorMessage
);

router.delete(
  "/:id",
  validateJWT,
  rbacMiddleware("DirectorMessage"),
  deleteDirectorMessage
);

export default router;