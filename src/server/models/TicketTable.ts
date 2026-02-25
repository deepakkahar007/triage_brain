import {
  pgTable,
  varchar,
  integer,
  uuid,
  text,
  boolean,
  index,
} from "drizzle-orm/pg-core";
import {
  createdAt,
  id,
  priorityEnum,
  sentimentEnum,
  statusEnum,
  updatedAt,
} from "./drizzleHelper";

// Raw incoming tickets.

export const TicketTable = pgTable(
  "ticket",
  {
    id,

    organization_id: uuid().notNull(),
    external_id: text().notNull(),
    source: varchar().notNull(),
    subject: text().notNull(),
    body: text().notNull(),
    status: statusEnum().notNull().default("open"),
    priority: priorityEnum().notNull().default("low"),
    sentiment: sentimentEnum().notNull().default("neutral"),
    detected_intent: varchar().notNull(),
    ai_confidence: integer().notNull().default(50),
    auto_replied: boolean().notNull().default(false),
    assigned_queue: varchar().notNull(),

    createdAt,
    updatedAt,
  },
  (t) => [
    index("idx_ticket_organization_id").on(t.organization_id),
    index("idx_ticket_external_id").on(t.external_id),
    index("idx_ticket_detected_intent").on(t.detected_intent),
    index("idx_ticket_created_at").on(t.createdAt),
  ],
);

export type SelectTicketTableType = typeof TicketTable.$inferSelect;
export type InsertTicketTableType = typeof TicketTable.$inferInsert;
