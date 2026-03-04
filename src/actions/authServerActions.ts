"use server";

import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/eden";
import { auth } from "@/server/auth/better_auth";
import { headers } from "next/headers";

export async function getSession() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });
  return session;
}

export const getUserServerSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session ? session : null;
};

export const signOutServerUser = async () => {
  const session = await auth.api.signOut({
    headers: await headers(),
  });

  return session;
};

export const getAllOrg = async () => {
  const res = await api.organization.all.get();
  return res.data;
};
