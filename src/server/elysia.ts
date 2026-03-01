import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { betterAuthHandler } from "./auth/authHandler";
import { protectedRoutes } from "./routes/protectedRoutes";
import { OrganizationRoutes } from "./routes/organizationRoutes";

const app = new Elysia({ prefix: "/api" })
  .use(
    cors({
      origin: "http://localhost:3000",
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
