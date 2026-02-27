import { Elysia } from "elysia";
import { betterAuthView } from "../auth/better_auth";
import { MyError } from "../error/CustomError";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .all("/api/auth/*", betterAuthView)
  .error({ MyError })
  .onError(({ error }) => {
    return error;
  });
