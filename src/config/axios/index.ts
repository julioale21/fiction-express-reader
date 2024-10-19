import axios, { InternalAxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Asegúrate de que esta ruta sea correcta

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BOOKS_SERVER_URL,
  timeout: 10000,
  headers: { "content-type": "application/json" },
});

// Interceptor de solicitud común para cliente y servidor
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    let session;

    if (typeof window !== "undefined") {
      // Lado del cliente
      session = await getSession();
    } else {
      // Lado del servidor
      session = await getServerSession(authOptions);
    }

    if (session?.user?.token) {
      config.headers.set("Authorization", `Bearer ${session.user.token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      if (typeof window !== "undefined") {
        // Lado del cliente
        const { signOut } = await import("next-auth/react");
        await signOut({ redirect: false });
        window.location.href = "/auth/login";
      } else {
        // Lado del servidor
        console.error("Error 401 en el servidor:", error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
