"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "./ui/button";

const SignOut = () => {
  const handleSignOut = async () => {
    const session = await signOut();

    console.log(session);
  };

  return (
    <div>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
};

export default SignOut;
