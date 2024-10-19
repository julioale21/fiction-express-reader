import axiosInstance from "@/config/axios";
import NextAuth, { DefaultSession, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface UserWithToken extends NextAuthUser {
  token: string;
  user: {
    id: number; // Changed from optional to required
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

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        dni: { label: "DNI", type: "number", placeholder: "12345678" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<UserWithToken | null> {
        try {
          const res = await axiosInstance.post("/auth/login", {
            dni: credentials?.dni ? parseInt(credentials.dni) : undefined,
            password: credentials?.password,
          });

          const { data } = res;

          console.log("data:", data);

          if (data && data.token) {
            const { token, ...userInfo } = data;
            return {
              id: userInfo.id.toString(),
              token,
              user: {
                id: userInfo.id,
                roles: userInfo.roles,
                dni: userInfo.dni,
                name: userInfo.name,
                lastName: userInfo.lastName,
                email: userInfo.email,
              },
            };
          }
          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as UserWithToken;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("token:", token);
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});

export { handler as GET, handler as POST };
