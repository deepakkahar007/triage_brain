import { db } from "../db";

export const getAllOrganization = async () => {
  const organization = await db.query.OrganizationTable.findMany({
    columns: {
      updatedAt: false,
    },
  });
  return organization;
};

export const getOrganizationBySlugOrId = async ({
  value,
  type,
}: {
  value: string;
  type: "slug" | "id";
}) => {
  if (type === "id") {
    const organization = await db.query.OrganizationTable.findFirst({
      where: {
        id: value,
      },
      columns: {
        updatedAt: false,
        createdAt: false,
      },
    });
    return organization;
  }
  const organization = await db.query.OrganizationTable.findFirst({
    where: {
      slug: value,
    },
    columns: {
      updatedAt: false,
      createdAt: false,
    },
  });
  return organization;
};
