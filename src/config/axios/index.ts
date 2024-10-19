import axios, { InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BOOKS_SERVER_URL,
  timeout: 10000,
  headers: { "content-type": "application/json" },
});

if (typeof window !== "undefined") {
  // Interceptores del lado del cliente
  axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const { getSession } = await import("next-auth/react");
      const session = await getSession();

      if (session?.user.token) {
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
        const { signOut } = await import("next-auth/react");
        await signOut({ redirect: false });
        window.location.href = "/auth/login";
      }
      return Promise.reject(error);
    }
  );
} else {
  // Interceptores del lado del servidor (si es necesario)
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Aquí puedes agregar lógica específica del servidor si es necesario
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Manejo de errores en el servidor
      console.error("Error en la respuesta del servidor:", error);
      return Promise.reject(error);
    }
  );
}

export default axiosInstance;
