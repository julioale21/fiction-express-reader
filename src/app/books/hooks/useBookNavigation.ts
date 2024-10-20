import { useState, useEffect } from "react";
import { useQueryBookById } from "@/app/books/hooks/tanstack/useQueryBookById";
import { Book } from "../types";

interface BookNavigationHook {
  book: Book | undefined;
  isLoading: boolean;
  error: Error | null;
  currentChapter: number;
  setCurrentChapter: (chapter: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  currentPageNumber: number;
  isLastPage: boolean;
  nextPage: () => void;
  prevPage: () => void;
}

const useBookNavigation = (bookId: number): BookNavigationHook => {
  const { data: book, isLoading, error } = useQueryBookById(bookId);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentChapter(0);
    setCurrentPage(0);
  }, [bookId]);

  const totalPages = book
    ? book.chapters.reduce((sum, chapter) => sum + chapter.pages.length, 0)
    : 0;

  const currentPageNumber = book
    ? book.chapters
        .slice(0, currentChapter)
        .reduce((sum, chapter) => sum + chapter.pages.length, 0) +
      currentPage +
      1
    : 0;

  const isLastPage = !!(
    book &&
    currentChapter === book.chapters.length - 1 &&
    currentPage === book.chapters[currentChapter].pages.length - 1
  );

  const nextPage = () => {
    console.log({currentPage});
    if (book && currentPage < book.chapters[currentChapter].pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else if (book && currentChapter < book.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      setCurrentPage(0);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
      setCurrentPage(
        book ? book.chapters[currentChapter - 1].pages.length - 1 : 0
      );
    }
  };

  return {
    book,
    isLoading,
    error,
    currentChapter,
    setCurrentChapter,
    currentPage,
    setCurrentPage,
    totalPages,
    currentPageNumber,
    isLastPage,
    nextPage,
    prevPage,
  };
};

export { useBookNavigation };
