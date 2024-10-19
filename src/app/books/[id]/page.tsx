import { Suspense } from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { prefetchBook } from "@/app/books/hooks/tanstack/useQueryBookById";

import { BookDetail } from "../components";

import { booksService } from "..";
import { getQueryClient } from "@/config/client/getQueryClient";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const book = await booksService.getBookById(id);
  return {
    title: book.title
      ? `${book.title} - Detalle del Libro`
      : "Detalle del Libro",
  };
}

async function getBook(id: number) {
  const queryClient = getQueryClient();
  await prefetchBook(id);
  return queryClient;
}

const BookPage = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);
  const queryClient = await getBook(id);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Cargando...</div>}>
        <BookDetail bookId={id} />
      </Suspense>
    </HydrationBoundary>
  );
};
export default BookPage;
