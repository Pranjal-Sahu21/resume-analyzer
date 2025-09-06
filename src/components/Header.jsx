import React from "react";
import { motion } from "framer-motion";

export default function Header({ onUploadClick }) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex justify-between items-center px-6 md:px-12 lg:px-24 py-4 border-b border-white/10"
    >
      <div className="flex gap-5 justify-center">
        <img src="/logo.svg" alt="Logo" className="h-8" />
        <h1 className="text-xl font-bold text-white">ResuScope</h1>
      </div>
      <motion.button
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 0px 15px rgba(255,255,255,0.3)",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={onUploadClick}
        className="px-5 py-2.5 cursor-pointer rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg hover:brightness-110 transition"
      >
        Upload
      </motion.button>
    </motion.header>
  );
}
