import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { carousels } from "../db/schemas/carousels.schema.js";
import { cloudinary } from "../services/file.service.js";

const createCarousel = async (req, res) => {
    const { title, description } = req.body;
  if (!title ) {
    res.status(400).json({ message: "Title is required." });
    return;
  }
  try {
    let coverImageUrl = null;
    if (req.file) {
      coverImageUrl = req.file.path;
    }
    if (!coverImageUrl) {
      res.status(400).json({ message: "Image is required." });
      return;
    }

    const carousel = await db.insert(carousels).values({
        title,
        description,
        image_url: coverImageUrl,
        creator_id: parseInt(req.user.id, 10),
      }).returning();
      res
        .status(201)
        .json({ message: "Carousel created successfully", carousel: carousel[0] });
  } catch (error) {
    console.error("Create carousel error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getCarousels = async (req, res) => {
    try {
      const carouselsData  = await db.select().from(carousels);
      res.status(200).json(carouselsData);
    } catch (error) {
      console.error("Get carousels error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
}

const deleteCarousel = async (req, res) => {
    const { id } = req.params;
     try {
      const deletedCarousel = await db
       .delete(carousels)
       .where(eq(carousels.id, parseInt(id, 10)))
       .returning();
       if (deletedCarousel.length === 0) {
         return res.status(404).json({ message: "Carousel not found." });
       } else {
        const imageUrl = deletedCarousel[0].image_url;
        const publicId = imageUrl.split('/').pop().split('.')[0];  // Extract the public ID

        await cloudinary.uploader.destroy(publicId);

         return res.status(200).json({ message: "Carousel deleted successfully." });
        }
     } catch (error) {
       console.error("Delete carousel error:", error);
       return res.status(500).json({ message: "Internal server error" });
     }
}

export { createCarousel, deleteCarousel, getCarousels };
