import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { programSections } from "./program_section.schema.js";

export const program = pgTable("program", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    image: text("image").notNull(),
    slug: text("slug").notNull().unique(),
    short_description: text("short_description").notNull(),
    duration: text("duration").notNull(),
    credit: text("credit").notNull(),
    degree: text("degree").notNull(),
    apply_instructions: text("apply_instructions").notNull(),
});

export const programRelations = relations(program, ({ many }) => ({
    sections: many(programSections),
}));