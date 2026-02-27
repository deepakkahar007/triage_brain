import { getSession } from "@/lib/auth-client";
import { api } from "@/lib/eden";
import { headers } from "next/headers";

const HomePage = async () => {
  const session = await getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  console.log("the new session from home", session);

  const protect_data = await api.protected.data.get();

  console.log("the protect data from home", protect_data);

  return <div>HomePage</div>;
};

export default HomePage;
