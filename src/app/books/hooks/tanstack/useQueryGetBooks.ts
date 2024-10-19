import { Book } from "@/app/books/types";
import axiosInstance from "@/config/axios";
import getQueryClient from "@/config/client/getQueryClient";
import { useQuery, QueryFunction } from "@tanstack/react-query";

const queryKey = ["books-list"];

const booksUrl = process.env.NEXT_PUBLIC_BOOKS_SERVER_URL;

if (!booksUrl) {
  throw new Error("Books server URL is not defined");
}

const getBooks: QueryFunction<Book[]> = async () => {

  const res = await axiosInstance.get("/books");
  const { data } = res;

  if (!data) {
    throw new Error("Error fetching books");
  }

  return data;
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
