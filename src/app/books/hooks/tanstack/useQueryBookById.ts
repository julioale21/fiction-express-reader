import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from "@tanstack/react-query";
import { Book } from "@/app/books/types";
import { booksService } from "../..";
import { getQueryClient } from "@/config/client/getQueryClient";

export const bookByIdOptions = (
  id: number
): UseQueryOptions<Book, Error, Book, readonly [string, number]> => ({
  queryKey: ["book", id] as const,
  queryFn: () => booksService.getBookById(id),
});

export function useQueryBookById(id: number): UseQueryResult<Book, Error> {
  return useQuery(bookByIdOptions(id));
}

export async function prefetchBook(id: number) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(bookByIdOptions(id));
  return queryClient;
}
