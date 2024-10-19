// export { default } from "next-auth/middleware";

// export const config = { matcher: ["/dashboard/:path*", "/api/:path*"] };
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define las rutas públicas que no requieren autenticación
  const publicPaths = ["/", "/auth/login"];

  const isPublicPath = publicPaths.includes(path);

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
