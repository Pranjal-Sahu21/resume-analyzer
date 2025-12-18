// src/components/Dropzone.js
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

const Dropzone = ({ onFile }) => {
  const [fileError, setFileError] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFileError("");

      if (acceptedFiles.length === 0) {
        setFileError("Please select a PDF or DOCX file");
        return;
      }

      const file = acceptedFiles[0];

      // Check file type
      if (!file.type.includes("pdf") && !file.name.endsWith(".docx")) {
        setFileError("Only PDF and DOCX files are allowed");
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFileError("File size must be less than 5MB");
        return;
      }

      onFile(file);
    },
    [onFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
  });

  return (
    <div className="w-full">
      <motion.div
        {...getRootProps()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-blue-400 bg-blue-100/30"
            : "border-gray-300 hover:border-gray-400 bg-white"
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          <div className="text-4xl">📄</div>
          <p className="text-gray-700">
            {isDragActive
              ? "Drop your resume here"
              : "Drag & drop your resume here, or click to select"}
          </p>
          <p className="text-xs text-gray-500">
            Supports PDF and DOCX files (max 5MB)
          </p>
        </div>
      </motion.div>

      {fileError && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-600"
        >
          {fileError}
        </motion.p>
      )}
    </div>
  );
};

export default Dropzone;
