import { QueryClient } from "@tanstack/query-core";
import { cache } from "react";

const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          gcTime: 60 * 1000,
        },
      },
    })
);
export default getQueryClient;
