import express from "express";
import { createCarousel, deleteCarousel, getCarousels, updateCarousel } from "../controllers/carousel.controller.js";
import { validateJWT } from "../middleware/jwt.middleware.js";
import { rbacMiddleware } from "../middleware/rbac.middleware.js";
import { imageUpload } from "../services/file.service.js";

const router = express.Router();

router.get("/", getCarousels);
router.post("/", validateJWT,rbacMiddleware("create:Carousel"), imageUpload.single("image") , createCarousel);
router.put("/:id", validateJWT, rbacMiddleware("edit:Carousel"), imageUpload.single("image"), updateCarousel);
router.delete("/:id", validateJWT,rbacMiddleware("delete:Carousel"), deleteCarousel);

export default router;
