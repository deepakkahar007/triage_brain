import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { auth } from "./auth/better_auth";
import { authMiddleware } from "./middleware/auth-middleware";
import { authRoutes } from "./routes/authRoutes";
import { protectedRoutes } from "./routes/protectedRoutes";

const app = new Elysia({ prefix: "/api" })
  .use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  // Mount Better-auth handler
  .mount(auth.handler)
  // Use auth middleware
  .use(authMiddleware)
  // Mount auth routes
  .use(authRoutes)
  // Mount example protected routes
  .use(protectedRoutes)

  // Public route
  .get("/", () => ({
    message: "Hello from Elysia API",
  }));

export type App = typeof app;

export default app;
