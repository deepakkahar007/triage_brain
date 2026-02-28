import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";
import { ac, admin, agent, owner, superadmin, viewer } from "./permissions";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000/api/auth",
  plugins: [
    organizationClient({
      ac,
      roles: {
        superadmin,
        admin,
        owner,
        agent,
        viewer,
      },
    }),
  ],
});

export const { signUp, signIn, signOut, useSession, getSession, organization } =
  authClient;
