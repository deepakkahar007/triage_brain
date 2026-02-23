import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@/server/models";
import { relations } from "@/server/models/relations";
import { env } from "@/env/envSchema";

const client = postgres(env.DATABASE_URL);

export const db = drizzle({ client, schema, relations });
