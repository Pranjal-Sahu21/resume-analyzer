import React, { useCallback, useState } from "react";

export default function Dropzone({ onFile }) {
  const [dragActive, setDragActive] = useState(false);

  const handleChange = useCallback(
    (e) => {
      e.preventDefault();
      const f = e.target.files?.[0];
      if (f) onFile(f);
    },
    [onFile]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      const f = e.dataTransfer.files?.[0];
      if (f) onFile(f);
    },
    [onFile]
  );

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  return (
    <label
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`flex flex-col items-center justify-center w-full h-48 p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
        dragActive
          ? "border-pink-400 bg-pink-500/10"
          : "border-white/20 bg-white/5 hover:bg-white/10 hover:border-indigo-400"
      }`}
    >
      <input
        required
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
        className="hidden"
      />
      <span className="text-white/70 text-sm md:text-base font-medium text-center">
        {dragActive
          ? "Drop your file here…"
          : "Drag & drop your resume here, or click to upload"}
      </span>
    </label>
  );
}
