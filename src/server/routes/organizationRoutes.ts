import { Elysia } from "elysia";
import {
  createOrganizationResponseSchema,
  createOrganizationSchema,
} from "../schema/organizationSchema";
import { MyError } from "../error/CustomError";
import {
  getAllOrganization,
  getOrganizationBySlugOrId,
} from "../drizzle/query/dbQuery";
import { createOrganizationMutation } from "../drizzle/mutation/dbMutation";
import { createUniqueOrganizationSlug } from "../utils";

export const OrganizationRoutes = new Elysia({
  prefix: "/organization",
})
  .post(
    "/create",
    async ({ body }) => {
      const isOrganizationExist = await getOrganizationBySlugOrId({
        value: body.slug,
        type: "slug",
      });

      if (isOrganizationExist) {
        throw new MyError(
          400,
          "Organization already exists with slug please chnage slug and try again",
        );
      }

      const uniqueSlug = createUniqueOrganizationSlug(body.name);

      await createOrganizationMutation({ ...body, slug: uniqueSlug });

      return {
        message: "Organization created successfully",
      };
    },
    {
      body: createOrganizationSchema,
      response: createOrganizationResponseSchema,
    },
  )
  .get("/all", async () => {
    const organization = await getAllOrganization();
    return {
      organization,
    };
  });
