import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicPaths = ["/", "/auth/login", "/auth/register"];
  const isPublicPath = publicPaths.some((publicPath) =>
    path.startsWith(publicPath)
  );

  const excludedDirectories = ["/_next/", "/public/"];
  const isExcludedDirectory = excludedDirectories.some((excludedDirectory) =>
    path.startsWith(excludedDirectory)
  );

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!isPublicPath && !isExcludedDirectory && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|public|auth|login|register).*)",
  ],
};
