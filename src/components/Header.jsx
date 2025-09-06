import React from "react";

export default function Header({ onUploadClick }) {
  return (
    <header className="flex justify-between items-center px-6 md:px-12 lg:px-24 py-4 border-b border-white/10">
      <div className="flex gap-5 justify-center">
        <img src="/logo.svg" alt="Logo" className="h-8" />
        <h1 className="text-xl font-bold text-white">AI Resume Analyzer</h1>
      </div>
      <button
        onClick={onUploadClick}
        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg hover:brightness-110 transition"
      >
        Upload
      </button>
    </header>
  );
}
