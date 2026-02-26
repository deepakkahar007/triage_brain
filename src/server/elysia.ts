import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { betterAuthHandler } from "./auth/authHandler";

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

  // Public route
  .get("/", () => ({
    message: "Hello from Elysia API",
  }));

export type App = typeof app;

export default app;
