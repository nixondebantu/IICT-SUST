import { db } from "../db/index.js";
import { carousels } from "../db/schemas/carousels.schema.js";

const createCarousel = async (req, res) => {
    const { title, description } = req.body;
  if (!title || !imageUrl) {
    res.status(400).json({ message: "Title and image URL are required." });
    return;
  }
  try {
    const carousel = await db.insert(carousels).values({
        title,
        description,
        image_url: imageUrl,
        creator_id: parseInt(req.jwtPayload?.id, 10),
      });
      res
        .status(201)
        .json({ message: "Carousel created successfully", carousel });
  } catch (error) {
    console.error("Create carousel error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export {createCarousel};
