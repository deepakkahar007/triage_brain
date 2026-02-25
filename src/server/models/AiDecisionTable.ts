import {
  pgTable,
  varchar,
  integer,
  uuid,
  jsonb,
  text,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "./drizzleHelper";

// Tracks what AI decided and why.

export const AiDecisionTable = pgTable("ai_decision", {
  id,

  organization_id: uuid().notNull(),
  ticket_id: uuid().notNull(),
  model_name: varchar().notNull(),
  prompt_version: varchar(),
  intent: varchar(),
  intent_confidence: integer().notNull(),
  sentiment: varchar(),
  generated_reply: text(),
  tokens_used: integer().notNull(),
  cost_estimate: varchar().notNull(),
  decision_reasoning: jsonb(),
  confidence_score: integer().notNull(),

  createdAt,
  updatedAt,
});

export type SelectAiDecisionTableType = typeof AiDecisionTable.$inferSelect;
export type InsertAiDecisionTableType = typeof AiDecisionTable.$inferInsert;
