import { Elysia } from "elysia";
import { requireAuth } from "../middleware/auth-middleware";

export const protectedRoutes = new Elysia({ prefix: "/protected" })
  .use(requireAuth)
  .get("/data", ({ user, session }: any) => {
    return {
      message: "You have accessed a protected server route successfully!",
      user,
      session,
    };
  });
