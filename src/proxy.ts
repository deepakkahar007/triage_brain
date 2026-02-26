import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  console.log("proxy runnes", request.url);

  // Check if we're trying to access a protected route
  // if (request.nextUrl.pathname.startsWith("/dashboard")) {
  //   const sessionToken =
  //     request.cookies.get("better-auth.session_token")?.value ||
  //     request.cookies.get("__Secure-better-auth.session_token")?.value;

  //   if (!sessionToken) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }

  //   try {
  //     // Validate the session with our API
  //     const response = await fetch(
  //       new URL("/api/auth/get-session", request.url),
  //       {
  //         headers: {
  //           cookie: request.headers.get("cookie") || "",
  //         },
  //       },
  //     );

  //     if (!response.ok) {
  //       return NextResponse.redirect(new URL("/", request.url));
  //     }

  //     const session = await response.json();
  //     if (!session || !session.user) {
  //       return NextResponse.redirect(new URL("/", request.url));
  //     }
  //   } catch (e) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*"],
};
