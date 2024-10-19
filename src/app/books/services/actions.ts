import axiosInstance from "@/config/axios";
import { Book } from "../types";

export const getBookById = async (id: number): Promise<Book> => {
  try {
    const res = await axiosInstance.get(`/books/${id}`);

    const { data } = res;

    if (!data || typeof data !== "object" || !("id" in data)) {
      throw new Error("Invalid book data received");
    }

    return data as Book;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
};

export const getBooks = async () => {
  const res = await axiosInstance.get("/books");
  const { data } = res;

  if (!data) {
    throw new Error("Error fetching books");
  }

  return data;
};
