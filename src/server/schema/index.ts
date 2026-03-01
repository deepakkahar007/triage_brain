import { createInsertSchema } from "drizzle-orm/zod";
import { OrganizationTable } from "../models";

export const createOrganizationSchema = createInsertSchema(OrganizationTable, {
  name: (z) => z.trim().min(3, "Name must be at least 3 characters long"),
  slug: (z) => z.trim().min(3, "Slug must be at least 3 characters long"),
  userId: (z) => z.trim().min(3, "User ID must be at least 3 characters long"),
  plan: (z) => z.default("free"),
  ticket_quota: (z) => z.default(100),
});
