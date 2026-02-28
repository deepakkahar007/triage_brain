import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username, organization } from "better-auth/plugins";
import { db } from "@/server/drizzle/db";
import * as schema from "@/server/models";
import { Context } from "elysia";
import { ac, superadmin, admin, agent, owner, viewer } from "@/lib/permissions";

// in future implement the admina nd organization plugin

export const auth = betterAuth({
  user: {
    additionalFields: {
      role: { type: ["owner", "admin", "agent", "viewer"], input: false },
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
      user: schema.UserTable,
      session: schema.SessionTable,
      verification: schema.VerificationTable,
      account: schema.AccountTable,
    },
  }),

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: "",
      clientSecret: "",
    },
    microsoft: {
      clientId: "",
      clientSecret: "",
    },
  },
  plugins: [
    username({
      minUsernameLength: 5,
      maxUsernameLength: 20,
    }),

    organization({
      ac,
      roles: {
        superadmin,
        owner,
        admin,
        agent,
        viewer,
      },
    }),
  ],
  advanced: {
    disableCSRFCheck: false,
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              role: user.role || "owner",
            },
          };
        },
      },
    },
  },
});

export type Auth = typeof auth;

export const betterAuthView = (context: Context) => {
  const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"];
  // validate request method
  if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
    return auth.handler(context.request);
  } else {
    context.set.status = 405;
    return "Method not allowed";
  }
};
