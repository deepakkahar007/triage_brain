import { randomUUID } from "crypto";

export const createUniqueOrganizationSlug = (name: string) => {
  const startName = name.slice(0, 4);
  const uuid = randomUUID().slice(0, 8);
  return `${startName}_${uuid}`;
};
