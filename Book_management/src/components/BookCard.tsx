"use client";

import { motion } from "framer-motion";
import { Book as BookIcon, Star, Trash2 } from "lucide-react";
import { deleteBook } from "@/lib/actions";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string | null;
  coverImage: string | null;
  rating: number;
  status: string;
}

export default function BookCard({ book, onDelete }: { book: Book; onDelete: (id: string) => void }) {
  const handleDelete = async () => {
    if (confirm("Are you sure you want to release this book back into the sea?")) {
      await deleteBook(book.id);
      onDelete(book.id);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass p-6 rounded-2xl flex flex-col gap-4 relative group overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={handleDelete}
          className="text-red-400 hover:text-red-300 transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-24 h-36 bg-secondary/50 rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-white/5">
          {book.coverImage ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
            </>
          ) : (
            <BookIcon size={40} className="text-accent/30" />
          )}
        </div>
        
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-moon leading-tight">{book.title}</h3>
          <p className="text-sm text-foreground/60 italic">by {book.author}</p>
          <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < book.rating ? "fill-accent text-accent glow-wave" : "text-foreground/20"} 
              />
            ))}
          </div>
        </div>
      </div>

      {book.description && (
        <p className="text-sm text-foreground/80 line-clamp-3 font-light leading-relaxed italic">
          &quot;{book.description}&quot;
        </p>
      )}

      <div className="mt-auto pt-4 flex justify-between items-center border-t border-white/5">
        <span className="text-[10px] uppercase tracking-widest text-accent/80 font-bold bg-accent/10 px-2 py-1 rounded">
          {book.status.replace(/_/g, " ")}
        </span>
        <button className="text-xs text-moon/40 hover:text-moon transition-colors">
          View Details
        </button>
      </div>
    </motion.div>
  );
}
