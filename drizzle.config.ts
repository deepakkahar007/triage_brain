import { env } from "./src/env/envSchema";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "migrations",
  schema: "./src/server/models/index.ts",
  dialect: "postgresql",
  strict: true,
  verbose: true,
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
