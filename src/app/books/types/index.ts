export interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  summary: string;
  chapters: {
    title: string;
    pages: string[];
  }[];
}

export interface ReadingMetrics {
  bookId: number;
  totalReadingTime: number;
  pageReadingTimes: { [pageNumber: number]: number };
  startTime: number | null;
  currentPage: number;
}

export interface Metrics {
  bookId: number | null;
  startTime: number | null;
  totalTime: number;
  pageReadingTimes: { [pageChapterKey: string]: number };
  lastPageTimestamp: number | null;
}
