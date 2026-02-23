import { Elysia } from "elysia";

const app = new Elysia({ prefix: "/api" }).get("/", "hello next js");

export type App = typeof app;

export default app;
