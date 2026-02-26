import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { db } from "@/server/drizzle/db";
import * as schema from "@/server/models";
import { Context } from "elysia";

// in future implement the admina nd organization plugin

export const auth = betterAuth({
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
  ],
  advanced: {
    disableCSRFCheck: false,
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
