import { auth } from "../auth/better_auth";

export const checkOrganizationSlug = async (slug: string) => {
  const isSlugtaken = await auth.api.checkOrganizationSlug({
    body: {
      slug,
    },
  });
  return isSlugtaken;
};
