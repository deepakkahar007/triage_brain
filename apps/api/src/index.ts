import { Hono } from "hono";
import { env } from "env";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "Hello Hono!", env });
});

export default app;
