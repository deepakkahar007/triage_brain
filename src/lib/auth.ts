import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
import { db } from "@/server/drizzle/db";
import * as schema from "@/server/models";

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
  plugins: [
    username({
      minUsernameLength: 5,
    }),
    nextCookies(),
  ],
});
