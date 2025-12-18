// src/components/JobCard.jsx
import React from "react";
import { motion } from "framer-motion";

export default function JobCard({ job, onClick }) {
  const companyName = job?.companyName || "Unknown Company";
  const jobTitle = job?.jobTitle || "Unknown Position";
  const imagePath = job?.imagePath || "/placeholder-image.png";
  const overallScore = job?.overallScore || 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer 
                 hover:bg-white/10 transition-all duration-300 group h-full min-h-[420px] 
                 shadow-md hover:shadow-xl hover:border-white/20"
    >
      {/* Large top image with zoom on hover */}
      <div className="w-full h-56 bg-white/10 overflow-hidden">
        <img
          src={imagePath}
          alt={companyName}
          className="w-full h-full object-cover object-top transform transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-6">
        <div>
          <h3 className="text-white font-semibold truncate text-lg">
            {companyName}
          </h3>
          <p className="text-white/60 text-sm truncate">{jobTitle}</p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-xs text-white/60">Score</div>
          <div
            className={`text-lg font-bold ${
              overallScore >= 80
                ? "text-green-400"
                : overallScore >= 60
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {overallScore}%
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                overallScore >= 80
                  ? "bg-green-500"
                  : overallScore >= 60
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${overallScore}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
