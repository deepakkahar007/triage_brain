import { Elysia } from "elysia";
import { auth } from "../auth/better_auth";

// Plugin to extract auth state and enforce it
export const requireAuth = (app: Elysia) =>
  app
    .derive(async ({ request }) => {
      console.log("Checking session for request:", request.url);
      try {
        const sessionData = await auth.api.getSession({
          headers: request.headers,
        });

        console.log("Session data found:", !!sessionData?.user);

        return {
          user: sessionData?.user ?? null,
          session: sessionData?.session ?? null,
        };
      } catch (error) {
        console.error("Auth derivation error:", error);
        return { user: null, session: null };
      }
    })
    .onBeforeHandle(({ user, set, path }) => {
      console.log(`Verifying auth for path: ${path}, user:`, !!user);
      if (!user) {
        set.status = 401;
        return {
          success: false,
          message: "Unauthorized. Please log in first.",
        };
      }
    });

// Separate non-blocking middleware version if needed
export const authMiddleware = (app: Elysia) =>
  app.derive(async ({ request }) => {
    try {
      const sessionData = await auth.api.getSession({
        headers: request.headers,
      });
      return {
        user: sessionData?.user ?? null,
        session: sessionData?.session ?? null,
      };
    } catch {
      return { user: null, session: null };
    }
  });
