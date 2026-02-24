"use client";

import { useSession } from "@/lib/auth-client";

export default function ClientSession() {
  const { data: session, isPending } = useSession();

  return (
    <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Client-Side Session
      </h2>

      {isPending ? (
        <p className="text-gray-500 animate-pulse">Loading session...</p>
      ) : session ? (
        <div>
          <p className="text-sm text-green-600 dark:text-green-400 mb-2 font-medium">
            ✅ Authenticated via Client Component (better-auth/react)
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded text-xs overflow-auto text-gray-800 dark:text-gray-200 mt-4 border border-gray-300 dark:border-gray-600">
            {JSON.stringify(session.user, null, 2)}
          </pre>
        </div>
      ) : (
        <p className="text-red-500 font-medium">❌ Unauthenticated</p>
      )}
    </div>
  );
}
