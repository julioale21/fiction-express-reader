import NextAuth, { DefaultSession, User as NextAuthUser } from "next-auth";
import { authOptions } from "./auth-options";

export interface UserWithToken extends NextAuthUser {
  token: string;
  user: {
    id: number;
    roles: string[];
    dni: number;
    name: string;
    lastName: string;
    email: string;
  };
}

declare module "next-auth" {
  interface Session {
    user: UserWithToken & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserWithToken;
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
