// import { auth } from "@/server/auth/better_auth";
// import { headers } from "next/headers";
// import Link from "next/link";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient, getSession, signIn, signUp } from "@/lib/auth-client";
import { auth } from "@/server/auth/better_auth";
import { headers } from "next/headers";
import SignOut from "@/components/SignOut";

export default async function Home() {
  // const user = await signUp.email({
  //   fetchOptions: {
  //     headers: await headers(),
  //   },
  //   email: "hello@gg.com",
  //   password: "hellohello",
  //   name: "hello",
  //   username: "hello123",
  //   displayUsername: "hellohello",
  // });

  // console.log(user);

  // const protect = await api.protected.data.get();
  // console.log("protext ", protect);

  // const session = await signIn.email({
  //   fetchOptions: {
  //     headers: await headers(),
  //   },
  //   email: "hello@gg.com",
  //   password: "hellohello",
  // });

  // const session = await auth.api.signOut({ headers: await headers() });

  // const session = await authClient.signOut({
  //   fetchOptions: {
  //     headers: await headers(),
  //   },
  // });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log(session);

  // this will be my landing page the user first visit here and then log in using the provider and then redirect to the home page

  return (
    <div>
      <h1>heelo</h1>
      <Button asChild>
        <Link href={"/sign-in"}>Log In</Link>
      </Button>

      <SignOut />
    </div>
  );
}
