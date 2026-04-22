import { createAuthClient } from "better-auth/react";

export const clientAuth = createAuthClient({
  baseURL: "http://localhost:3000",
});
