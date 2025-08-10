import express from "express";
import {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews,
} from "../controllers/news.controller.js";
import { validateJWT } from "../middleware/jwt.middleware.js";
import { rbacMiddleware } from "../middleware/rbac.middleware.js";

const router = express.Router();

router.get("/", getNews);
router.get("/:id", getNewsById);
router.post("/", validateJWT, rbacMiddleware("News"), createNews);
router.put("/:id", validateJWT, rbacMiddleware("News"), updateNews);
router.delete("/:id", validateJWT, rbacMiddleware("News"), deleteNews);

export default router;
