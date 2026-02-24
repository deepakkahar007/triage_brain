import { auth } from "@/server/auth/better_auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  const session = await auth.api.signInEmail({
    body: {
      email: "hello@example.com",
      password: "hellohello",
    },
  });

  console.log(session);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-sans gap-8 bg-gray-50 dark:bg-gray-900 border-gray-200">
      <main className="flex flex-col gap-8 items-center text-center">
        <h1 className="text-4xl font-extrabold pb-2 bg-linear-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Triage Brain Auth
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg">
          Welcome to the auth demonstration using Elysia Server, Next.js
          Middleware, and Better Auth.
        </p>

        {session ? (
          <div className="flex flex-col items-center gap-4 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md ring-1 ring-gray-200 dark:ring-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Welcome back!
            </h2>
            <p className="text-gray-500 font-medium">{session.user.email}</p>
            <Link
              href="/dashboard"
              className="mt-4 px-6 py-3 w-full bg-blue-600 outline-none text-white rounded-xl shadow hover:bg-blue-700 transition"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md ring-1 ring-gray-200 dark:ring-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              You are signed out
            </h2>
            <p className="text-gray-500 text-sm">
              Please sign in to access the protected dashboard route.
            </p>
            <div className="flex w-full gap-4 mt-2">
              <Link
                href="/dashboard"
                className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition outline-none"
              >
                Access Protected
              </Link>
            </div>
            {/* The sign-in mechanism should actually be a client-side function but for now this directs users to test. */}
            <p className="text-xs text-blue-500 dark:text-blue-400">
              Tip: Use curl or an API route to sign in via Elysia API
              (`/api/auth/sign-in/email`)
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
