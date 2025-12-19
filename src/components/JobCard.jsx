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
      className="flex flex-col bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden cursor-pointer 
                 transition-all duration-300 group h-full min-h-[420px] 
                 shadow-md hover:shadow-lg"
    >
      {/* Large top image with zoom on hover */}
      <div className="w-full h-56 bg-gray-100 overflow-hidden">
        <img
          src={imagePath}
          alt={companyName}
          className="w-full h-full object-cover object-top transform transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-6">
        <div>
          <h3 className="text-gray-900 font-semibold truncate text-lg">
            {companyName}
          </h3>
          <p className="text-gray-600 text-sm truncate">{jobTitle}</p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-xs text-gray-600">Score</div>
          <div
            className={`text-lg font-bold ${
              overallScore >= 80
                ? "text-green-600"
                : overallScore >= 60
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {overallScore}%
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
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
