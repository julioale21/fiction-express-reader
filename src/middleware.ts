import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define las rutas públicas
  const publicPaths = ["/", "/auth/login", "/auth/register"];
  const isPublicPath = publicPaths.includes(path);

  // Define las rutas que deben ser excluidas del middleware
  const excludedPaths = [
    "/_next",
    "/api/auth",
    "/public",
    "/static",
    "/dist",
    "/.next",
    "/vercel",
  ];
  const isExcludedPath = excludedPaths.some((excludedPath) =>
    path.startsWith(excludedPath)
  );

  // Comprueba si la ruta es un archivo estático
  const isStaticFile = /\.(.*)$/.test(path);

  // Obtiene el token de autenticación
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Si la ruta no es pública, no está excluida, no es un archivo estático, y no hay token, redirige al login
  if (!isPublicPath && !isExcludedPath && !isStaticFile && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

// Configura el matcher para incluir todas las rutas excepto las excluidas
export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public|static|dist|\\.next|vercel).*)",
  ],
};
