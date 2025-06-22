import { pgTable, text, serial, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const surveyResults = pgTable("survey_results", {
  id: serial("id").primaryKey(),
  answers: jsonb("answers").notNull(),
  recommendedTeam: text("recommended_team").notNull(),
  matchPercentage: integer("match_percentage").notNull(),
  shareId: text("share_id").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSurveyResultSchema = createInsertSchema(surveyResults).omit({
  id: true,
  createdAt: true,
});

export type InsertSurveyResult = z.infer<typeof insertSurveyResultSchema>;
export type SurveyResult = typeof surveyResults.$inferSelect;

export const surveyAnswerSchema = z.object({
  questionId: z.number(),
  selectedOption: z.string(),
});

export const surveySubmissionSchema = z.object({
  answers: z.array(surveyAnswerSchema),
});

export type SurveyAnswer = z.infer<typeof surveyAnswerSchema>;
export type SurveySubmission = z.infer<typeof surveySubmissionSchema>;
