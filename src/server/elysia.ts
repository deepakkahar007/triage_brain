import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { betterAuthHandler } from "./auth/authHandler";
import { protectedRoutes } from "./routes/protectedRoutes";
import { OrganizationRoutes } from "./routes/organizationRoutes";
import { MyError } from "./error/CustomError";

const app = new Elysia({ prefix: "/api" })
  .error({
    MyError,
  })
  .onError(({ error }) => {
    if (error instanceof MyError) {
      return error.toResponse();
    }

    return Response.json(
      {
        status: false,
        message: "Internal Server Error",
        data: null,
        error: {
          code: 500,
          name: "UNKNOWN",
        },
      },
      { status: 500 },
    );
  })
  .use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .all("/auth/*", betterAuthHandler)
  .use(protectedRoutes)
  .use(OrganizationRoutes)

  // Public route
  .get("/", () => ({
    message: "Hello from Elysia API",
  }));

export type App = typeof app;

export default app;
