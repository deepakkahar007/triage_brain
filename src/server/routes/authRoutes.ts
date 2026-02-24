import { Elysia, t } from "elysia";
import { auth, betterAuthView } from "../auth/better_auth";
import { MyError } from "../error/CustomError";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .all("/api/auth/*", betterAuthView)
  .error({ MyError })
  .onError(({ error }) => {
    return error;
  })
  .get("/user", async ({ headers }) => {
    console.log("headers", headers);
    const user = await auth.api.getSession({ headers: headers as any });

    if (!user) throw new MyError(401, "unauthenticated");

    return user;
  })
  .post(
    "/sign-in",
    async ({ body, headers }) => {
      const user = await auth.api.signInEmail({
        headers: headers as any,
        body: {
          email: body.email,
          password: body.password,
        },
      });

      if (!user) throw new MyError(404, "user not found");

      return user;
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    },
  );
