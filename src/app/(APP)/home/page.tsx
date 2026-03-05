import { api } from "@/lib/eden";

import { auth } from "@/server/auth/better_auth";
import { headers } from "next/headers";

const HomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  console.log(session);

  return <div>HomePage</div>;
};

export default HomePage;
