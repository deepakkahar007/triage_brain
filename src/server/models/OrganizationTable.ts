import { pgTable, varchar, integer } from "drizzle-orm/pg-core";
import { createdAt, id, planEnum, updatedAt } from "./drizzleHelper";

// Each customer company.

export const OrganizationTable = pgTable("user_organization", {
  id,

  name: varchar().notNull(),
  slug: varchar().unique().notNull(),
  plan: planEnum().default("free").notNull(),
  ticket_quota: integer(),

  createdAt,
  updatedAt,
});

export type SelectOrganizationTableType = typeof OrganizationTable.$inferSelect;
export type InsertOrganizationTableType = typeof OrganizationTable.$inferInsert;
