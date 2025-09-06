import React from "react";

export default function Header({ onUploadClick }) {
  return (
    <header className="flex justify-between items-center px-6 md:px-12 lg:px-24 py-4 border-b border-white/10">
      <h1 className="text-xl font-bold text-white">AI Resume Analyzer</h1>
      <button
        onClick={onUploadClick}
        className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold"
      >
        Upload
      </button>
    </header>
  );
}
