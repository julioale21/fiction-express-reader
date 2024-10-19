import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserWithToken } from "./route";
import axiosInstance from "@/config/axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        dni: { label: "DNI", type: "number", placeholder: "12345678" },
        password: { label: "Password", type: "password" },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials): Promise<any> {
        try {
          const res = await axiosInstance.post("/auth/login", {
            dni: credentials?.dni ? parseInt(credentials.dni) : undefined,
            password: credentials?.password,
          });

          const { data } = res;

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
      // Verifica si el `user` existe y agrégale las propiedades adicionales
      if (user) {
        const userWithToken = user as UserWithToken; // Hace el casting a UserWithToken

        token.user = {
          ...userWithToken, // Asegura que las propiedades adicionales estén presentes
          token: userWithToken.token, // Si el token está presente en el usuario
          user: userWithToken.user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
