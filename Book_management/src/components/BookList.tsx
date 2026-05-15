"use client";

import { AnimatePresence } from "framer-motion";
import BookCard from "./BookCard";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string | null;
  coverImage: string | null;
  rating: number;
  status: string;
}

export default function BookList({ books, setBooks }: { books: Book[], setBooks: React.Dispatch<React.SetStateAction<Book[]>> }) {
  const handleDelete = (id: string) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  if (books.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-foreground/40 italic">Your library is currently empty. Make a wish to add a book.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
      <AnimatePresence mode="popLayout">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onDelete={handleDelete} />
        ))}
      </AnimatePresence>
    </div>
  );
}
