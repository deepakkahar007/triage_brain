import { auth } from "@/server/auth/better_auth";

export const checkPermissionRole = async () => {
  const session = await auth.api.hasPermission({
    body: {
      organizationId: "",
      permissions: {
        project: ["manage_platform"],
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return session;
};
