import { createOrganizationSchema } from "@/server/schema/organizationSchema";
import { db } from "../db";
import {
  OrganizationTable,
  InsertOrganizationTableType,
} from "@/server/models/OrganizationTable";

export const createOrganizationMutation = async (
  value: InsertOrganizationTableType,
) => {
  const organization = await db
    .insert(OrganizationTable)
    .values(value)
    .returning({ id: OrganizationTable.id });

  return organization[0];
};
