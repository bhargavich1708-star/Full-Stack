"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getBooks } from "@/lib/actions";
import BookList from "@/components/BookList";
import AddBookModal from "@/components/AddBookModal";
import Link from "next/link";
import { ArrowLeft, Sparkles, Search } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string | null;
  coverImage: string | null;
  rating: number;
  status: string;
}

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <Link href="/" className="inline-flex items-center text-accent/60 hover:text-accent transition-colors mb-4 group">
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Shore
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-moon glow-wave">The Midnight Archive</h1>
          <p className="text-foreground/60 mt-2 italic font-light">Explore the stories you&apos;ve gathered under the moon.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
            <input 
              type="text"
              placeholder="Search your scrolls..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass pl-12 pr-6 py-3 rounded-full w-full sm:w-64 focus:outline-none focus:border-accent/50 transition-all text-sm"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="glass px-6 py-3 rounded-full text-accent font-semibold hover:bg-accent/10 transition-all flex items-center justify-center gap-2 text-sm shadow-lg border-accent/20"
          >
            <Sparkles size={16} />
            New Wish
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-40">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full"
          />
        </div>
      ) : (
        <BookList books={filteredBooks} setBooks={setBooks} />
      )}

      <AddBookModal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        fetchBooks();
      }} />
    </div>
  );
}
