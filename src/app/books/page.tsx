// app/books/page.tsx
import React from "react";
import { prefetchBooks } from "@/app/books/hooks/tanstack/useQueryGetBooks";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { BooksList } from "@/app/books/components";
import getQueryClient from "@/config/client/getQueryClient";

const BooksListPage = async () => {
  const queryClient = getQueryClient();
  await prefetchBooks();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BooksList listTitle="Mi Biblioteca Mágica" />
    </HydrationBoundary>
  );
};

export default BooksListPage;
