// import { createEnv } from "@t3-oss/env-core";
// import { z } from "zod";

// export const serverEnv = createEnv({
//   server: {
//     DATABASE_URL: z.string(),
//   },
//   emptyStringAsUndefined: true,
//   runtimeEnv: process.env,
// });

// export const clientEnv = createEnv({
//   client: {},
//   clientPrefix: "PUBLIC_",
//   emptyStringAsUndefined: true,
//   runtimeEnv: process.env,
// });

export const env = {
  DATABASE_URL: "posrtgre",
};
