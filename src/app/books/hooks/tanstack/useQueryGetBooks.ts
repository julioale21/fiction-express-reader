import { Book } from "@/app/books/types";
import getQueryClient from "@/config/client/getQueryClient";
import { useQuery, QueryFunction } from "@tanstack/react-query";

const queryKey = ["books-list"];

const booksUrl = process.env.NEXT_PUBLIC_BOOKS_SERVER_URL;

if (!booksUrl) {
  throw new Error("Books server URL is not defined");
}

const getBooks: QueryFunction<Book[]> = async () => {
  const response = await fetch(`${booksUrl}/books`, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export function useBooks() {
  return useQuery<Book[], Error>({
    queryKey,
    queryFn: getBooks,
  });
}

export async function prefetchBooks() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery<Book[]>({
    queryKey,
    queryFn: getBooks,
  });
  return queryClient;
}
