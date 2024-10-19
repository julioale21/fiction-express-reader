
"use client";

import { getQueryClient } from "@/config/client/getQueryClient";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Book } from "../../types";
import { booksOptions } from "./booksOptions";


export function useGetBooks(): UseQueryResult<Book[], Error> {
  return useQuery<Book[], Error>(booksOptions);
}

export async function prefetchBooks() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(booksOptions);
  return queryClient;
}
