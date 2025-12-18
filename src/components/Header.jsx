import React from "react";
import { motion } from "framer-motion";

export default function Header({ onUploadClick }) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 z-50 w-full flex justify-between items-center px-6 md:px-12 lg:px-24 py-4 bg-blue-50/40 backdrop-blur-md border-b border-white/20 shadow-sm"
    >
      <div className="flex gap-5 justify-center">
        <img src="/logo.svg" alt="Logo" className="h-8" />
        <h1 className="text-xl font-bold text-gray-900">ResuScope</h1>
      </div>
      {/* <motion.button
        whileHover={{
          boxShadow: "0px 0px 12px rgba(59,130,246,0.25)",
        }}
        whileTap={{ scale: 0.98 }}
        onClick={onUploadClick}
        className="px-5 py-3 cursor-pointer rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#415ead] text-white text-sm font-semibold shadow-md active:scale-95 transition"
      >
        Upload
      </motion.button> */}
    </motion.header>
  );
}
