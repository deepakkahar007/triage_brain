import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignOut from "@/components/SignOut";
import { getUserServerSession } from "@/actions/authServerActions";
import { api } from "@/lib/eden";

export default async function Home() {
  const session = await getUserServerSession();
  // this will be my landing page the user first visit here and then log in using the provider and then redirect to the home page

  // const org = await api.organization.create.post({
  //   name: "deee",
  //   slug: "       deepak",
  //   plan: "free",
  //   ticket_quota: 100,
  //   userId: "LqqJS0XUsVks7CSv3qfvOInkOdg3E5w2              ",
  // });

  const org = await api.organization.all.get();

  console.log(org.data);

  return (
    <div>
      <h1>hello {session?.user.name}</h1>

      {session ? (
        <SignOut />
      ) : (
        <Button asChild>
          <Link href={"/sign-in"}>Log In</Link>
        </Button>
      )}
    </div>
  );
}
