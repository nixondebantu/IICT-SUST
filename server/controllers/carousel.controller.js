import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { carousels } from "../db/schemas/carousels.schema.js";
import { cloudinary } from "../services/file.service.js";

const createCarousel = async (req, res) => {
  const { title, description, button_text, button_link } = req.body;

  if (!title) {
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

    const carousel = await db
      .insert(carousels)
      .values({
        title,
        description,
        image_url: coverImageUrl,
        button_text,
        button_link,
        creator_id: parseInt(req.user.id, 10),
      })
      .returning();
    res.status(201).json({
      message: "Carousel created successfully",
      carousel: carousel[0],
    });
  } catch (error) {
    console.error("Create carousel error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCarousels = async (req, res) => {
  try {
    const carouselsData = await db.select().from(carousels);
    res.status(200).json(carouselsData);
  } catch (error) {
    console.error("Get carousels error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCarouselById = async (req, res) => {
  const { id } = req.params;
  try {
    const carousel = await db
      .select()
      .from(carousels)
      .where(eq(carousels.id, parseInt(id, 10)))
      .limit(1);

    if (carousel.length === 0) {
      return res.status(404).json({ message: "Carousel not found." });
    }

    res.status(200).json(carousel[0]);
  } catch (error) {
    console.error("Get carousel by ID error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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
      if (imageUrl) {
        const publicId = imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      return res
        .status(200)
        .json({ message: "Carousel deleted successfully." });
    }
  } catch (error) {
    console.error("Delete carousel error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateCarousel = async (req, res) => {
  const { id } = req.params;
  const { title, description, button_text, button_link } = req.body;

  try {
    // Find the existing carousel
    const existingCarousel = await db
      .select()
      .from(carousels)
      .where(eq(carousels.id, parseInt(id, 10)))
      .limit(1);

    if (existingCarousel.length === 0) {
      return res.status(404).json({ message: "Carousel not found." });
    }

    // Prepare the data to update
    const updatedData = {};
    if (title) updatedData.title = title;
    if (description) updatedData.description = description;
    // Conditionally add new fields if they are provided in the request
    if (button_text !== undefined) updatedData.button_text = button_text;
    if (button_link !== undefined) updatedData.button_link = button_link;

    let coverImageUrl = existingCarousel[0].image_url;

    if (req.file) {
      // If there's a new image, upload and delete the old one from Cloudinary
      // Only attempt to destroy if there was an existing image_url
      if (coverImageUrl) {
        const publicId = coverImageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }
      coverImageUrl = req.file.path;
    }

    updatedData.image_url = coverImageUrl;

    // Update the carousel in the database
    const updatedCarousel = await db
      .update(carousels)
      .set(updatedData)
      .where(eq(carousels.id, parseInt(id, 10)))
      .returning();

    res.status(200).json({
      message: "Carousel updated successfully",
      carousel: updatedCarousel[0],
    });
  } catch (error) {
    console.error("Update carousel error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createCarousel,
  deleteCarousel,
  getCarousels,
  getCarouselById,
  updateCarousel,
};
