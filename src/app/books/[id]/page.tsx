// app/book/[id]/page.tsx
import { Suspense } from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import {
  prefetchBook,
  getBookById,
} from "@/app/books/hooks/tanstack/useQueryBookById";
import getQueryClient from "@/config/client/getQueryClient";
import { BookDetail } from "../components";

// Esta función se ejecuta en el servidor
export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const book = await getBookById(id);
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
