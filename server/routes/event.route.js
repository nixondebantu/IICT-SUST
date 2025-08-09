import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";
import { validateJWT } from "../middleware/jwt.middleware.js";
import { rbacMiddleware } from "../middleware/rbac.middleware.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", validateJWT, rbacMiddleware("Event"), createEvent);
router.put("/:id", validateJWT, rbacMiddleware("Event"), updateEvent);
router.delete("/:id", validateJWT, rbacMiddleware("Event"), deleteEvent);

export default router;
