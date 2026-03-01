import { pgTable, varchar, integer, text, index } from "drizzle-orm/pg-core";
import { createdAt, id, planEnum, updatedAt } from "./drizzleHelper";
import { UserTable } from "./AuthTable";

// Each customer company.

export const OrganizationTable = pgTable(
  "user_organization",
  {
    id,

    name: varchar().notNull(),
    slug: varchar().unique().notNull(),
    plan: planEnum().default("free").notNull(),
    ticket_quota: integer(),

    userId: text()
      .notNull()
      .references(() => UserTable.id),

    createdAt,
    updatedAt,
  },
  (t) => [index("idx_organization_user_id").on(t.userId)],
);

export type SelectOrganizationTableType = typeof OrganizationTable.$inferSelect;
export type InsertOrganizationTableType = typeof OrganizationTable.$inferInsert;
