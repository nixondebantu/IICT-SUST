import express from "express";
import {
  createMessage,
  getMessage,
  getMessageById,
  updateMessage,
} from "../controllers/director_message.controller.js";
import { validateJWT } from "../middleware/jwt.middleware.js";
import { rbacMiddleware } from "../middleware/rbac.middleware.js";

const router = express.Router();

router.get("/", getMessage);

router.post("/", validateJWT, rbacMiddleware("DirectorMessage"), createMessage);

router.get(
  "/:id",
  validateJWT,
  rbacMiddleware("DirectorMessage"),
  getMessageById
);

router.put(
  "/:id",
  validateJWT,
  rbacMiddleware("DirectorMessage"),
  updateMessage
);

export default router;
