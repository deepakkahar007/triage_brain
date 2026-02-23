import { auth } from "@/lib/auth";
import { api } from "@/lib/eden";

export default async function Home() {
  const res = await api.get();

  // const authresponse = await auth.api.signUpEmail({
  //   body: {
  //     name: "hola amigo",
  //     username: "yolahi",
  //     displayUsername: "yolayola",
  //     email: "hello@example.com",
  //     password: "hellohello",
  //   },
  //   asResponse: true,
  // });

  // const authresponse = await auth.api.signInEmail({
  //   body: {
  //     email: "hello@example.com",
  //     password: "hellohello",
  //   },
  //   asResponse: true,
  // });

  // console.log(authresponse);
  return (
    <div>
      <h1>hello {res.data}</h1>
    </div>
  );
}
