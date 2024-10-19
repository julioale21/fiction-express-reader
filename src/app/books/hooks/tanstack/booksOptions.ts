import { QueryKey, UseQueryOptions } from "@tanstack/react-query";

import { Book } from "../../types";
import { booksService } from "../..";

export const booksOptions: UseQueryOptions<Book[], Error, Book[], QueryKey> = {
  queryKey: ["books-list"] as const,
  queryFn: booksService.getBooks,
};
