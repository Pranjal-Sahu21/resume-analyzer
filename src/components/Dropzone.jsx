import React, { useCallback } from "react";

export default function Dropzone({ onFile }) {
  const handleChange = useCallback(
    (e) => {
      const f = e.target.files?.[0];
      if (f) onFile(f);
    },
    [onFile]
  );

  return (
    <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-white/20 rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 hover:border-indigo-400 transition-all duration-300">
      <span className="text-white/70 text-sm md:text-base font-medium">
        Drag & drop or click to upload
      </span>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
        className="hidden"
      />
    </label>
  );
}
