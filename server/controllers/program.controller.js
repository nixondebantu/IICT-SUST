import { eq, desc, asc, and, ilike } from "drizzle-orm";
import { db } from "../db/index.js";
import { program } from "../db/schemas/program.schema.js";
import { programSections } from "../db/schemas/program_section.schema.js";

const formatProgramForResponse = (programData) => {
  if (!programData) {
    return null;
  }

  return {
    id: programData.id,
    title: programData.title,
    slug: programData.slug,
    short_description: programData.short_description,
    duration: programData.duration,
    credit: programData.credit,
    degree: programData.degree,
    apply_instructions: programData.apply_instructions,
    sections: programData.sections ? programData.sections.map(section => ({
      id: section.id,
      title: section.title,
      content: section.content,
      order: section.order
    })) : []
  };
};

export const getAllPrograms = async (req, res) => {
  try {
    const { search, sort, order } = req.query;
    
    let query = db.select().from(program);
    
    // Apply search filter if provided
    if (search) {
      query = query.where(
        or(
          ilike(program.title, `%${search}%`),
          ilike(program.short_description, `%${search}%`)
        )
      );
    }
    
    // Apply sorting if provided
    if (sort && ['title', 'degree'].includes(sort)) {
      const sortOrder = order === 'asc' ? asc : desc;
      query = query.orderBy(sortOrder(program[sort]));
    } else {
      // Default sorting by id
      query = query.orderBy(desc(program.id));
    }
    
    const programs = await query;
    
    return res.status(200).json({
      success: true,
      data: programs
    });
  } catch (error) {
    console.error("Error fetching programs:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch programs",
      error: error.message
    });
  }
};

export const getProgramBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const [programData] = await db
      .select()
      .from(program)
      .where(eq(program.slug, slug))
      .leftJoin(
        programSections,
        eq(program.id, programSections.program_id)
      );
    
    if (!programData) {
      return res.status(404).json({
        success: false,
        message: "Program not found"
      });
    }
    
    // Get all sections for this program
    const sections = await db
      .select()
      .from(programSections)
      .where(eq(programSections.program_id, programData.program.id))
      .orderBy(asc(programSections.order));
    
    const formattedProgram = {
      ...programData.program,
      sections
    };
    
    return res.status(200).json({
      success: true,
      data: formatProgramForResponse(formattedProgram)
    });
  } catch (error) {
    console.error("Error fetching program:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch program",
      error: error.message
    });
  }
};

export const createProgram = async (req, res) => {
  try {
    const { 
      title, 
      slug, 
      short_description, 
      duration, 
      credit, 
      degree, 
      apply_instructions,
      sections 
    } = req.body;
    
    // Validate required fields
    if (!title || !slug || !short_description || !duration || !credit || !degree || !apply_instructions) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
    
    // Check if slug already exists
    const existingProgram = await db
      .select()
      .from(program)
      .where(eq(program.slug, slug));
    
    if (existingProgram.length > 0) {
      return res.status(400).json({
        success: false,
        message: "A program with this slug already exists"
      });
    }
    
    // Create program
    const [newProgram] = await db
      .insert(program)
      .values({
        title,
        slug,
        short_description,
        duration,
        credit,
        degree,
        apply_instructions
      })
      .returning();
    
    // Create sections if provided
    if (sections && Array.isArray(sections) && sections.length > 0) {
      const sectionsToInsert = sections.map((section, index) => ({
        program_id: newProgram.id,
        title: section.title,
        content: section.content,
        order: section.order || index + 1
      }));
      
      await db.insert(programSections).values(sectionsToInsert);
    }
    
    return res.status(201).json({
      success: true,
      message: "Program created successfully",
      data: newProgram
    });
  } catch (error) {
    console.error("Error creating program:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create program",
      error: error.message
    });
  }
};

export const updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      slug, 
      short_description, 
      duration, 
      credit, 
      degree, 
      apply_instructions,
      sections 
    } = req.body;
    
    // Check if program exists
    const existingProgram = await db
      .select()
      .from(program)
      .where(eq(program.id, parseInt(id)));
    
    if (existingProgram.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Program not found"
      });
    }
    
    // Check if slug is already taken by another program
    if (slug) {
      const slugCheck = await db
        .select()
        .from(program)
        .where(and(
          eq(program.slug, slug),
          and(program.id !== parseInt(id))
        ));
      
      if (slugCheck.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Slug is already taken by another program"
        });
      }
    }
    
    // Update program
    const [updatedProgram] = await db
      .update(program)
      .set({
        title: title || existingProgram[0].title,
        slug: slug || existingProgram[0].slug,
        short_description: short_description || existingProgram[0].short_description,
        duration: duration || existingProgram[0].duration,
        credit: credit || existingProgram[0].credit,
        degree: degree || existingProgram[0].degree,
        apply_instructions: apply_instructions || existingProgram[0].apply_instructions
      })
      .where(eq(program.id, parseInt(id)))
      .returning();
    
    // Update sections if provided
    if (sections && Array.isArray(sections)) {
      // Delete existing sections
      await db
        .delete(programSections)
        .where(eq(programSections.program_id, parseInt(id)));
      
      // Insert new sections
      if (sections.length > 0) {
        const sectionsToInsert = sections.map((section, index) => ({
          program_id: parseInt(id),
          title: section.title,
          content: section.content,
          order: section.order || index + 1
        }));
        
        await db.insert(programSections).values(sectionsToInsert);
      }
    }
    
    return res.status(200).json({
      success: true,
      message: "Program updated successfully",
      data: updatedProgram
    });
  } catch (error) {
    console.error("Error updating program:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update program",
      error: error.message
    });
  }
};

export const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if program exists
    const existingProgram = await db
      .select()
      .from(program)
      .where(eq(program.id, parseInt(id)));
    
    if (existingProgram.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Program not found"
      });
    }
    
    // Delete associated sections first
    await db
      .delete(programSections)
      .where(eq(programSections.program_id, parseInt(id)));
    
    // Delete program
    await db
      .delete(program)
      .where(eq(program.id, parseInt(id)));
    
    return res.status(200).json({
      success: true,
      message: "Program deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting program:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete program",
      error: error.message
    });
  }
};