import React from "react";
import { motion } from "framer-motion";
import JobCard from "./JobCard";

export default function JobGrid({ jobs = [] }) {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-10 sm:py-12">
        <p className="text-gray-600 text-sm sm:text-base">
          No job positions available
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 mt-20">
      {/* Section title */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-bold tracking-wide leading-snug
            text-2xl sm:text-3xl lg:text-3xl xl:text-4xl"
        >
          <span className="text-gradient-dark">Track your applications</span>
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-bold tracking-wide leading-snug
            text-2xl sm:text-3xl lg:text-3xl xl:text-4xl
             "
        >
          <span className="text-gradient-dark">& Resume ratings</span>
        </motion.h2>
      </div>

      {/* Job grid */}
      <div
        className="grid gap-5 sm:gap-6 lg:gap-8
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
        auto-rows-fr mt-12"
      >
        {jobs.map((job, index) => (
          <motion.div
            key={job.id || index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="h-full"
          >
            <JobCard job={job} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
