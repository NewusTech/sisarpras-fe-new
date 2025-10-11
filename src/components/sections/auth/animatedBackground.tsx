"use client";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
        animate={{
          opacity: 0.6,
          scale: 1,
          x: [0, 20, -15, 10, 0],
          y: [0, -10, 15, -5, 0],
        }}
        transition={{
          duration: 2,
          ease: "easeOut",
          x: { repeat: Infinity, duration: 10, ease: "easeInOut" },
          y: { repeat: Infinity, duration: 12, ease: "easeInOut" },
        }}
        className="absolute bottom-[-380px] left-[-380px] h-[978px] w-[978px] rounded-full bg-primary blur-[80px]"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
        animate={{
          opacity: 0.5,
          scale: 1,
          x: [0, -25, 18, -12, 0],
          y: [0, 12, -20, 8, 0],
        }}
        transition={{
          duration: 2,
          ease: "easeOut",
          x: { repeat: Infinity, duration: 15, ease: "easeInOut" },
          y: { repeat: Infinity, duration: 12, ease: "easeInOut" },
        }}
        className="absolute top-[-100px] right-[-100px] h-[562px] w-[562px] rounded-full bg-warning blur-[100px]"
      />
    </>
  );
}
