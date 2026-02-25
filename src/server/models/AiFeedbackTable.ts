import { pgTable, varchar, uuid, text } from "drizzle-orm/pg-core";
import { createdAt, id, intentTypeEnum, updatedAt } from "./drizzleHelper";

// Agent corrections.

export const AiFeedbackTable = pgTable("ai_feedback", {
  id,

  organization_id: uuid().notNull(),
  ticket_id: uuid().notNull(),
  ai_decision_id: uuid().notNull(),
  corrected_intent: varchar().notNull(),
  corrected_reply: text().notNull(),
  feedback_type: intentTypeEnum().notNull(),
  agent_id: uuid(),

  createdAt,
  updatedAt,
});

export type SelectAiFeedbackTableType = typeof AiFeedbackTable.$inferSelect;
export type InsertAiFeedbackTableType = typeof AiFeedbackTable.$inferInsert;
