import { uuid, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";

export const id = uuid("id").primaryKey().defaultRandom();

export const createdAt = timestamp("created_at", {
  withTimezone: true,
}).defaultNow();

export const updatedAt = timestamp("updated_at", { withTimezone: true })
  .defaultNow()
  .$onUpdateFn(() => new Date());

export const isActive = boolean("is_active").default(true);

// ENUM

export const planEnum = pgEnum("plan", ["free", "starter", "pro"]);

export const statusEnum = pgEnum("status", ["open", "closed", "escalated"]);

export const priorityEnum = pgEnum("priority", [
  "low",
  "medium",
  "high",
  "urgent",
]);

export const sentimentEnum = pgEnum("sentiment", ["angry", "neutral", "happy"]);

export const ticketMessageSenderTypeEnum = pgEnum("sender_type", [
  "customer",
  "agent",
  "ai",
]);

export const intentTypeEnum = pgEnum("intent", [
  "wrong_intent",
  "wrong_reply",
  "both",
]);

export const knowledgeBaseStatusEnum = pgEnum("knowledge_base_status", [
  "processing",
  "ready",
]);
