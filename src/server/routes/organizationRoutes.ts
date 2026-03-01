import { Elysia } from "elysia";
import { createOrganizationSchema } from "../schema";

export const OrganizationRoutes = new Elysia({
  prefix: "/organization",
}).post(
  "/create",
  async ({ body }) => {
    return { body };
  },
  {
    body: createOrganizationSchema,
  },
);
