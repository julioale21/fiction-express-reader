import { Suspense } from "react";

import { BookDetail } from "../components";

import { booksService } from "..";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const book = await booksService.getBookById(id);
  return {
    title: book.title
      ? `${book.title} - Detalle del Libro`
      : "Detalle del Libro",
  };
}

const BookPage = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <BookDetail bookId={id} />
    </Suspense>
  );
};
export default BookPage;
