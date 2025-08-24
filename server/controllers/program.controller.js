import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { program } from "../db/schemas/program.schema.js";
import { programSections } from "../db/schemas/program_section.schema.js";

const formatProgramForResponse = (item) => {
  if (!item) return null;
  return {
    id: item.id,
    title: item.title,
    image: item.image,
    slug: item.slug,
    short_description: item.short_description,
    duration: item.duration,
    credit: item.credit,
    degree: item.degree,
    apply_instructions: item.apply_instructions,
    sections: item.sections
      ? item.sections.map((s) => ({
          id: s.id,
          title: s.title,
          description: s.description,
        }))
      : [],
  };
};

const createProgram = async (req, res) => {
  const {
    title,
    image,
    slug,
    short_description,
    duration,
    credit,
    degree,
    apply_instructions,
    sections = [],
  } = req.body;

  if (
    !title ||
    !image ||
    !slug ||
    !short_description ||
    !duration ||
    !credit ||
    !degree ||
    !apply_instructions
  ) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // check program existence
    const existingProgram = await db.query.program.findFirst({
      where: eq(program.slug, slug.toLowerCase()),
    });

    if (existingProgram) {
      return res.status(400).json({ message: "Program with this slug already exists." });
    }

    const [createdProgram] = await db
      .insert(program)
      .values({
        title,
        image,
        slug: slug.toLowerCase(),
        short_description,
        duration,
        credit,
        degree,
        apply_instructions,
      })
      .returning();

    if (Array.isArray(sections) && sections.length > 0) {
      await db.insert(programSections).values(
        sections.map((s) => ({
          title: s.title,
          description: s.description,
          program_id: createdProgram.id,
        }))
      );
    }

    const result = await db.query.program.findFirst({
      where: eq(program.id, createdProgram.id),
      with: { sections: true },
    });

    res.status(201).json({
      message: "Program created successfully",
      program: formatProgramForResponse(result),
    });
  } catch (error) {
    console.error("Create program error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllPrograms = async (req, res) => {
  try {
    const programs = await db.query.program.findMany({
      with: { sections: true },
      orderBy: (p, { asc }) => asc(p.title),
    });

    res.status(200).json(programs.map(formatProgramForResponse));
  } catch (error) {
    console.error("Get all programs error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProgramById = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await db.query.program.findFirst({
      where: eq(program.id, id),
      with: { sections: true },
    });

    if (!item) {
      return res.status(404).json({ message: "Program not found." });
    }

    res.status(200).json(formatProgramForResponse(item));
  } catch (error) {
    console.error("Get program by ID error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProgramBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const item = await db.query.program.findFirst({
      where: eq(program.slug, slug),
      with: { sections: true },
    });

    if (!item) {
      return res.status(404).json({ message: "Program not found." });
    }

    res.status(200).json(formatProgramForResponse(item));
  } catch (error) {
    console.error("Get program by slug error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProgram = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    image,
    slug,
    short_description,
    duration,
    credit,
    degree,
    apply_instructions,
    sections,
  } = req.body;

  const programId = parseInt(id, 10);

  try {
    const [existingProgram] = await db
      .select({ id: program.id })
      .from(program)
      .where(eq(program.id, programId));

    if (!existingProgram) {
      return res.status(404).json({ message: "Program not found." });
    }

    const updatedData = {};
    if (title) updatedData.title = title;
    if (image) updatedData.image = image;
    if (slug) {
      const existingProgram = await db.query.program.findFirst({
        where: eq(program.slug, slug.toLowerCase()),
      });

      if (existingProgram.id !== programId) {
        return res.status(400).json({ message: "Program with this slug already exists." });
      }

      updatedData.slug = slug.toLowerCase();
    }
    if (short_description) updatedData.short_description = short_description;
    if (duration) updatedData.duration = duration;
    if (credit) updatedData.credit = credit;
    if (degree) updatedData.degree = degree;
    if (apply_instructions) updatedData.apply_instructions = apply_instructions;

    if (Object.keys(updatedData).length > 0) {
      await db
        .update(program)
        .set(updatedData)
        .where(eq(program.id, programId));
    }

    // Handle sections if provided
    if (Array.isArray(sections)) {
      // Remove old sections
      await db
        .delete(programSections)
        .where(eq(programSections.program_id, programId));

      // Insert new ones
      if (sections.length > 0) {
        await db.insert(programSections).values(
          sections.map((s) => ({
            title: s.title,
            description: s.description,
            program_id: programId,
          }))
        );
      }
    }

    const result = await db.query.program.findFirst({
      where: eq(program.id, programId),
      with: { sections: true },
    });

    res.status(200).json({
      message: "Program updated successfully",
      program: formatProgramForResponse(result),
    });
  } catch (error) {
    console.error("Update program error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProgram = async (req, res) => {
  const { id } = req.params;
  const programId = parseInt(id, 10);

  try {
    const [deletedProgram] = await db
      .delete(program)
      .where(eq(program.id, programId))
      .returning();

    if (!deletedProgram) {
      return res.status(404).json({ message: "Program not found." });
    }

    return res.status(200).json({ message: "Program deleted successfully." });
  } catch (error) {
    console.error("Delete program error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createProgram,
  deleteProgram,
  getAllPrograms,
  getProgramById,
  getProgramBySlug,
  updateProgram
};

