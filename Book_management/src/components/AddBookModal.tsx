"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { addBook } from "@/lib/actions";

export default function AddBookModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const formData = new FormData(e.currentTarget);
      const result = await addBook(formData);
      if (result?.success) {
        onClose();
      } else {
        alert("The stars are not aligned: " + (result?.error || "Unknown error"));
      }
    } catch {
      alert("A magical interference occurred.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass w-full max-w-lg p-8 rounded-3xl relative shadow-2xl border-white/20"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-foreground/40 hover:text-foreground transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-accent" />
              <h2 className="text-2xl font-bold text-moon">Make a Reading Wish</h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground/60 mb-1 ml-1">Book Title</label>
                <input
                  required
                  name="title"
                  placeholder="The Starless Sea"
                  className="w-full bg-secondary/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent/50 text-foreground transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/60 mb-1 ml-1">Author</label>
                <input
                  required
                  name="author"
                  placeholder="Erin Morgenstern"
                  className="w-full bg-secondary/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent/50 text-foreground transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/60 mb-1 ml-1">Description (Optional)</label>
                <textarea
                  name="description"
                  placeholder="A magical journey through a hidden library..."
                  rows={3}
                  className="w-full bg-secondary/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent/50 text-foreground transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/60 mb-1 ml-1">Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    name="rating"
                    defaultValue="5"
                    className="w-full bg-secondary/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent/50 text-foreground transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/60 mb-1 ml-1">Cover URL (Optional)</label>
                  <input
                    name="coverImage"
                    placeholder="https://..."
                    className="w-full bg-secondary/30 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent/50 text-foreground transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="mt-4 bg-accent text-background font-bold py-4 rounded-xl hover:bg-accent/90 transition-all active:scale-95 shadow-lg shadow-accent/20 disabled:opacity-50"
              >
                {isPending ? "Manifesting..." : "Add to My Collection"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
