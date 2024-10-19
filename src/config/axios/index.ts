import axios, { InternalAxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BOOKS_SERVER_URL,
  timeout: 10000,
  headers: { "content-type": "application/json" },
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    let session;

    if (typeof window !== "undefined") {
      session = await getSession();
    } else {
      session = await getServerSession(authOptions);
    }

    if (session?.user?.token) {
      config.headers.set("Authorization", `Bearer ${session.user.token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      if (typeof window !== "undefined") {
        const { signOut } = await import("next-auth/react");
        await signOut({ redirect: false });
        window.location.href = "/auth/login";
      } else {
        console.error("Error 401 en el servidor:", error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
