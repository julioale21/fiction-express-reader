import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { booksOptions } from "@/app/books/hooks/tanstack/booksOptions";

import { BooksList } from "./components/BooksList";
import { getQueryClient } from "@/config/client/getQueryClient";

export default async function BooksListPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(booksOptions);

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BooksList listTitle="Mi Biblioteca Mágica" />
      </HydrationBoundary>
    </main>
  );
}
