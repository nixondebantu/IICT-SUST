import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { program } from "./program.schema.js";

export const programSections = pgTable("program_sections", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    program_id: integer("program_id").references(() => program.id, {
        onDelete: "cascade",
    }).notNull(),
});

export const programSectionsRelations = relations(programSections, ({ one }) => ({
    program: one(program, {
        fields: [programSections.program_id],
        references: [program.id],
    }),
}));