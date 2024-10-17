import { useQuery, QueryFunction, QueryKey } from "@tanstack/react-query";
import { Book } from "@/app/books/types";
import getQueryClient from "@/config/client/getQueryClient";

export const getBookById = async (id: number): Promise<Book> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BOOKS_SERVER_URL}/books/${id}`
  );

  if (!response.ok) {
    throw new Error(`Error fetching book: ${response.statusText}`);
  }

  const data = await response.json();

  if (!data || typeof data !== "object" || !("id" in data)) {
    throw new Error("Invalid book data received");
  }

  return data as Book;
};

const queryFn: QueryFunction<Book, QueryKey> = async ({ queryKey }) => {
  const id = queryKey[1];
  if (typeof id !== "number") {
    throw new Error("Invalid book ID");
  }
  return getBookById(id);
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
    queryFn: () => getBookById(id),
  });
  return queryClient;
}
