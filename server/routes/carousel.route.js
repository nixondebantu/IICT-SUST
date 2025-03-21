import express from "express";
import { createCarousel } from "../controllers/carousel.controller.js";
import { validateJWT } from "../middleware/jwt.middleware.js";
import { rbacMiddleware } from "../middleware/rbac.middleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the express server of IICT, SUST." });
});

router.post("/", validateJWT,rbacMiddleware("create:Carousel"), createCarousel);

export default router;
