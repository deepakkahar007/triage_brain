"use server";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";

export async function getSession() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });
  return session;
}
