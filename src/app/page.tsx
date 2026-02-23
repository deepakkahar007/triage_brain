import { api } from "@/lib/eden";

export default async function Home() {
  const res = await api.get();

  return (
    <div>
      <h1>hello {res.data}</h1>
    </div>
  );
}
