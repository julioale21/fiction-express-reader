"use client";

import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Book } from "@/app/books/types";
import BookIcon from "@mui/icons-material/MenuBook";
import { GradientButton } from "@/common/components";
import { useRouter } from "next/navigation";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/books/${book.id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "0.1s",
        "&:hover": {
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
          cursor: "pointer",
        },
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="140"
        image={book.cover}
        alt={book.title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: "#1a237e", fontWeight: "bold" }}
        >
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          por {book.author}
        </Typography>

        <GradientButton
          text="¡Leer ahora!"
          startIcon={<BookIcon />}
          onClick={handleClick}
        />
      </CardContent>
    </Card>
  );
};

export { BookCard };
