import { Book } from "@/app/books/types";
import getQueryClient from "@/config/client/getQueryClient";
import { useQuery } from "@tanstack/react-query";
import { booksService } from "../..";

const queryKey = ["books-list"];

export function useBooks() {
  return useQuery<Book[], Error>({
    queryKey,
    queryFn: booksService.getBooks,
  });
}

export async function prefetchBooks() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery<Book[]>({
    queryKey,
    queryFn: booksService.getBooks,
  });
  return queryClient;
}
