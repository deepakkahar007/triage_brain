import { Elysia } from "elysia";
import { auth } from "../auth/better_auth";

// Middleware to extract auth state without blocking
export const authMiddleware = new Elysia({ name: "auth-middleware" }).derive(
  async ({ request }) => {
    try {
      const sessionData = await auth.api.getSession({
        headers: request.headers,
      });

      return {
        user: sessionData?.user || null,
        session: sessionData?.session || null,
      };
    } catch {
      return { user: null, session: null };
    }
  },
);

// Middleware that requires authentication
export const requireAuth = new Elysia({ name: "require-auth" })
  .use(authMiddleware)
  .onBeforeHandle((context: any) => {
    if (!context.user) {
      context.set.status = 401;
      return { message: "Unauthorized. Please log in first." };
    }
  });
