import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Book } from "@/app/books/types";
import Link from "next/link";
import BookIcon from "@mui/icons-material/MenuBook";
import { GradientButton } from "@/common/components";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        },
      }}
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
        <Link href={`/books/${book.id}`} passHref>
          <GradientButton
            text="¡Leer ahora!"
            startIcon={<BookIcon />}
            onClick={() => {}}
          />
        </Link>
      </CardContent>
    </Card>
  );
};

export { BookCard };
