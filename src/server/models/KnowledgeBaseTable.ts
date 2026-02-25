import { pgTable, varchar } from "drizzle-orm/pg-core";
import {
  createdAt,
  id,
  knowledgeBaseStatusEnum,
  updatedAt,
} from "./drizzleHelper";

// Per organization.

export const KnowledgeBaseTable = pgTable("knowledge_base", {
  id,

  file_name: varchar().notNull(),
  file_url: varchar().notNull(),
  status: knowledgeBaseStatusEnum().default("processing").notNull(),

  // Embedded chunks.

  createdAt,
  updatedAt,
});

export type SelectKnowledgeBaseTableType =
  typeof KnowledgeBaseTable.$inferSelect;
export type InsertKnowledgeBaseTableType =
  typeof KnowledgeBaseTable.$inferInsert;
