import React from "react";
import JobCard from "./JobCard";
import { motion } from "framer-motion";

export default function JobGrid({ jobs = [] }) {
  if (!jobs.length) {
    return (
      <div className="text-white/60 text-center mt-6">No jobs to display.</div>
    );
  }

  return (
    <div className="flex-col">
      <div className="text-center my-6  pb-4 mb-12">
        <h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl max-lg:text-3xl font-bold tracking-wide text-gradient leading-normal"
        >
          Track Your Applications
        </h1>

        <h1
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl max-lg:text-3xl font-bold mt-[-12px] tracking-wide text-gradient leading-relaxed"
        >
          & Resume Ratings
        </h1>
      </div>

      <div className="flex gap-4 mt-8">
        {jobs.map((j) => (
          <JobCard key={j.id} job={j} />
        ))}
      </div>
    </div>
  );
}
