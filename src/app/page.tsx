// import { auth } from "@/server/auth/better_auth";
// import { headers } from "next/headers";
// import Link from "next/link";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // const session = await auth.api.signInEmail({
  //   body: {
  //     email: "hello@example.com",
  //     password: "hellohello",
  //   },
  // });

  // console.log(session);

  // this will be my landing page the user first visit here and then log in using the provider and then redirect to the home page

  return (
    <div>
      <h1>heelo</h1>
      <Button asChild>
        <Link href={"/sign-in"}>Log In</Link>
      </Button>
    </div>
  );
}
