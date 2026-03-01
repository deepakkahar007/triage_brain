"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

const SignOut = () => {
  const handleSignOut = async () => {
    const session = await signOut();

    console.log(session);

    setTimeout(() => {
      redirect("/");
    }, 1000);
  };

  return <Button onClick={handleSignOut}>Sign Out</Button>;
};

export default SignOut;
