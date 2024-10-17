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
