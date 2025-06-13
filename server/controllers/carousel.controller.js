import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { carousels } from "../db/schemas/carousels.schema.js";
import { cloudinary } from "../services/file.service.js";

const createCarousel = async (req, res) => {
  const { title, description, button_text, button_link } = req.body;

  if (!title || !req.file) {
    return res.status(400).json({ message: "Title and image are required." });
  }

  try {
    const [newCarousel] = await db
      .insert(carousels)
      .values({
        title,
        description,
        image_url: req.file.path,
        button_text,
        button_link,
        creator_id: parseInt(req.user.id, 10),
      })
      .returning({ id: carousels.id });

    const carouselData = await db.query.carousels.findFirst({
      where: eq(carousels.id, newCarousel.id),
      with: {
        creator: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(201).json({
      message: "Carousel created successfully",
      carousel: carouselData,
    });
  } catch (error) {
    console.error("Create carousel error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCarousels = async (req, res) => {
  try {
    const carouselsData = await db.query.carousels.findMany({
      with: {
        creator: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.status(200).json(carouselsData);
  } catch (error) {
    console.error("Get carousels error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCarouselById = async (req, res) => {
  const { id } = req.params;
  try {
    const carousel = await db.query.carousels.findFirst({
      where: eq(carousels.id, parseInt(id, 10)),
      with: {
        creator: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!carousel) {
      return res.status(404).json({ message: "Carousel not found." });
    }
    res.status(200).json(carousel);
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
    const existingCarousel = await db
      .select()
      .from(carousels)
      .where(eq(carousels.id, parseInt(id, 10)))
      .limit(1);

    if (existingCarousel.length === 0) {
      return res.status(404).json({ message: "Carousel not found." });
    }

    const updatedData = {};
    if (title) updatedData.title = title;
    if (description) updatedData.description = description;
    if (button_text !== undefined) updatedData.button_text = button_text;
    if (button_link !== undefined) updatedData.button_link = button_link;

    let coverImageUrl = existingCarousel[0].image_url;

    if (req.file) {
      if (coverImageUrl) {
        const publicId = coverImageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }
      coverImageUrl = req.file.path;
    }

    updatedData.image_url = coverImageUrl;

    await db
      .update(carousels)
      .set(updatedData)
      .where(eq(carousels.id, parseInt(id, 10)));

    const updatedCarouselData = await db.query.carousels.findFirst({
      where: eq(carousels.id, parseInt(id, 10)),
      with: {
        creator: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "Carousel updated successfully",
      carousel: updatedCarouselData,
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
