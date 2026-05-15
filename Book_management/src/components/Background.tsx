"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Star {
  top: string;
  left: string;
  size: string;
  duration: number;
}

export default function Background() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate stars only on the client to avoid hydration mismatch
    const generatedStars = [...Array(50)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 3}px`,
      duration: 2 + Math.random() * 4,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050A18]">
      {/* The Moon */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ 
          opacity: [0.7, 0.9, 0.7],
          y: 0,
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 2, ease: "easeOut" }
        }}
        className="absolute top-10 right-10 md:top-20 md:right-20 w-32 h-32 md:w-48 md:h-48 bg-white rounded-full glow-moon"
        style={{ boxShadow: "0 0 80px 20px rgba(255, 255, 255, 0.15)" }}
      />

      {/* Stars with gentle twinkle */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{ duration: star.duration, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bg-white rounded-full"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
            }}
          />
        ))}
      </div>

      {/* Improved Bioluminescent Waves */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] pointer-events-none">
        {/* Deep Wave */}
        <motion.div
          animate={{ x: ["-2%", "2%", "-2%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-[-10%] w-[120%] h-full opacity-40"
        >
          <svg viewBox="0 0 1440 320" className="w-full h-full fill-[#1C2541]">
            <path d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,224C840,224,960,192,1080,176C1200,160,1320,160,1380,160L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </motion.div>

        {/* Mid Wave - Glowing */}
        <motion.div
          animate={{ x: ["2%", "-2%", "2%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-[-10%] w-[120%] h-[80%] opacity-60"
        >
          <svg viewBox="0 0 1440 320" className="w-full h-full fill-[#00B4D8] glow-wave">
            <path d="M0,192L60,202.7C120,213,240,235,360,224C480,213,600,171,720,165.3C840,160,960,192,1080,197.3C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </motion.div>

        {/* Top Wave - Brightest Rare Blue */}
        <motion.div
          animate={{ x: ["-3%", "3%", "-3%"], y: [0, 5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-[-10%] w-[120%] h-[60%] opacity-80"
        >
          <svg viewBox="0 0 1440 320" className="w-full h-full fill-[#00E5FF] glow-wave">
            <path d="M0,256L60,245.3C120,235,240,213,360,218.7C480,224,600,256,720,250.7C840,245,960,203,1080,192C1200,181,1320,203,1380,213.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
