// src/components/JobGrid.jsx
import React from "react";
import { motion } from "framer-motion";
import JobCard from "./JobCard";

export default function JobGrid({ jobs = [], onButtonClick }) {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No job positions available</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Section title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold tracking-wide max-lg:text-3xl text-center leading-relaxed"
      >
        <span className="text-gradient-dark">Track your applications</span>
      </motion.h2>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold tracking-wide max-lg:text-3xl text-center mt-[-24px] leading-relaxed"
      >
        <span className="text-gradient-dark">& Resume ratings</span>
      </motion.h2>

      {/* Job grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
        {jobs.map((job, index) => (
          <motion.div
            key={job.id || index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="h-full mt-4"
          >
            <JobCard
              job={job}
              onClick={() => {
                console.log("Selected job:", job);
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
