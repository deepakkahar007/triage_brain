import { Elysia } from "elysia";
import { requireAuth } from "../middleware/auth-middleware";

export const protectedRoutes = new Elysia({ prefix: "/protected" })
  .use(requireAuth)
  .group("", (app) =>
    app.get("/data", ({ user, session }: any) => {
      console.log("Handler executing for user:", !!user);
      return {
        message: "You have accessed a protected server route successfully!",
        user,
        session,
      };
    }),
  );
