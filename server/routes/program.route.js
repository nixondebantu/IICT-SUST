import express from "express";
import {
  createProgram,
  deleteProgram,
  getAllPrograms,
  getProgramBySlug,
  updateProgram,
} from "../controllers/program.controller.js";
import { validateJWT } from "../middleware/jwt.middleware.js";
import { rbacMiddleware } from "../middleware/rbac.middleware.js";

const router = express.Router();

router.get("/", getAllPrograms);

router.get("/:slug", getProgramBySlug);

router.post("/", validateJWT, rbacMiddleware("Program"), createProgram);

router.put("/:id", validateJWT, rbacMiddleware("Program"), updateProgram);

router.delete("/:id", validateJWT, rbacMiddleware("Program"), deleteProgram);

export default router;