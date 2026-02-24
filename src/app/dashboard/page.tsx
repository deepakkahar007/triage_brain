import { auth } from "@/server/auth/better_auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ClientSession from "./ClientSession";

export default async function DashboardPage() {
  // Fetch session efficiently on the server side using Better Auth Elysia API
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Example of hard server-side protection fallback (though middleware handles this)
  // if (!session) {
  //   redirect("/");
  // }

  return (
    <div className="max-w-4xl mx-auto p-8 font-sans">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold dark:bg-blue-900 dark:text-blue-100">
          Protected Route
        </p>
      </div>

      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Server-Side User Info
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">
          ✅ Authenticated via Server Component (Elysia Handler)
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
              User ID
            </p>
            <p className="text-sm font-mono mt-1">{session?.user.id}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
              Email
            </p>
            <p className="text-sm font-medium mt-1">{session?.user.email}</p>
          </div>
        </div>

        <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-2">
          Raw Server Session
        </h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded text-xs overflow-auto text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
          {JSON.stringify(session?.user, null, 2)}
        </pre>
      </div>

      <ClientSession />
    </div>
  );
}
