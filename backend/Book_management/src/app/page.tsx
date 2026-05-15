"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Book as BookIcon, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import AddBookModal from "@/components/AddBookModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<{x: number, duration: number, delay: number, left: string}[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setParticles([...Array(10)].map(() => ({
      x: Math.random() * 50 - 25,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
      left: `${10 + Math.random() * 80}%`
    })));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="p-4 bg-accent/10 rounded-full border border-accent/20"
          >
            <BookIcon size={48} className="text-accent glow-wave" />
          </motion.div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-moon glow-wave tracking-tighter">
          NightWave
        </h1>
        <p className="text-xl md:text-3xl max-w-2xl text-foreground/80 mb-12 leading-relaxed font-light italic">
          &quot;Where rare blue waves meet your heart&apos;s desire.&quot;
        </p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link href="/library">
            <button className="glass px-12 py-5 rounded-full text-accent font-bold hover:bg-accent/10 transition-all hover:scale-105 active:scale-95 text-xl shadow-2xl border-accent/30 flex items-center gap-3">
              Open My Library
            </button>
          </Link>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-10 py-5 rounded-full text-moon/60 font-semibold hover:text-moon transition-all hover:scale-105 active:scale-95 text-lg flex items-center gap-2"
          >
            <Sparkles size={20} />
            Make a Wish
          </button>
        </motion.div>
      </motion.div>

      {/* Decorative bioluminescent floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {mounted && particles.map((p, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
              x: [0, p.x, 0]
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity,
              delay: p.delay
            }}
            className="absolute w-1 h-1 bg-accent rounded-full blur-[1px]"
            style={{
              bottom: "10%",
              left: p.left,
            }}
          />
        ))}
      </div>

      <AddBookModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
