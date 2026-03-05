"use server";

import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/eden";
import { auth } from "@/server/auth/better_auth";
import { headers } from "next/headers";

export const getUserServerSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session ? session : null;
};

export const getAllOrg = async () => {
  const res = await api.organization.all.get();
  return res.data;
};

type CreateOrganizationType = {
  name: string;
  slug: string;
  plan: "free" | "starter" | "pro";
  ticket_quota: number;
  userId: string;
};

export const createOrganization = async ({
  name,
  slug,
  plan,
  ticket_quota,
  userId,
}: CreateOrganizationType) => {
  const res = await api.organization.create.post({
    name,
    slug,
    plan,
    ticket_quota,
    userId,
  });

  return { data: res.data, status: true };
};

export const setActiveOrganizationId = async (id: string) => {
  await auth.api.setActiveOrganization({
    body: {
      organizationId: id,
    },
    headers: await headers(),
  });

  return true;
};
