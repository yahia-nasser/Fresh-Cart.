import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });
  const authRouts = [
    "/login",
    "/register",
    "/forgotPasswords",
    "/resetPassword",
    "/verifyCode",
  ];
  const registeredRoute = [
    "/cart",
    "/payment",
    "/allorders",
    "/wishlist",
    "/changePassword",
    "/changeDetails",
  ];

  if (token && authRouts.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && registeredRoute.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/cart",
    "/payment",
    "/wishlist",
    "/allorders",
    "/login",
    "/register",
    "/changePassword",
    "/changeDetails",
    "/forgotPasswords",
    "/resetPassword",
    "/verifyCode",
  ],
};
