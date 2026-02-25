import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import {
  createdAt,
  id,
  ticketMessageSenderTypeEnum,
  updatedAt,
} from "./drizzleHelper";

// Threaded messages (future proof).

export const TicketMessageTable = pgTable("ticket_message", {
  id,

  ticket_id: uuid().notNull(),
  sender_type: ticketMessageSenderTypeEnum().notNull(),
  sender_id: uuid().notNull(),
  content: text().notNull(),

  createdAt,
  updatedAt,
});

export type SelectTicketMessageTableType =
  typeof TicketMessageTable.$inferSelect;
export type InsertTicketMessageTableType =
  typeof TicketMessageTable.$inferInsert;
