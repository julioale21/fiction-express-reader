import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define a list of file extensions that are typically public assets
const publicFileExtensions = [
  "css",
  "js",
  "json",
  "jpg",
  "jpeg",
  "png",
  "gif",
  "svg",
  "ico",
  "woff",
  "woff2",
  "ttf",
  "eot",
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicPaths = ["/", "/auth/login", "/auth/register"];
  const isPublicPath = publicPaths.some((publicPath) => path === publicPath);

  // Check if the path is a public asset
  const isPublicAsset = publicFileExtensions.some((ext) =>
    path.endsWith(`.${ext}`)
  );

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!isPublicPath && !isPublicAsset && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
