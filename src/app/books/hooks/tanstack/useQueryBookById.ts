import { useQuery, QueryFunction, QueryKey } from "@tanstack/react-query";
import { Book } from "@/app/books/types";
import getQueryClient from "@/config/client/getQueryClient";

import { booksService } from "../..";

const queryFn: QueryFunction<Book, QueryKey> = async ({ queryKey }) => {
  const id = queryKey[1];
  if (typeof id !== "number") {
    throw new Error("Invalid book ID");
  }
  return booksService.getBookById(id);
};

export function useQueryBookById(id: number) {
  return useQuery<Book, Error, Book, [string, number]>({
    queryKey: ["book", id],
    queryFn,
  });
}

export async function prefetchBook(id: number) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery<Book, Error, Book, [string, number]>({
    queryKey: ["book", id],
    queryFn: () => booksService.getBookById(id),
  });
  return queryClient;
}
