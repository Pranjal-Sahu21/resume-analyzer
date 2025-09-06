import React from "react";
import JobCard from "./JobCard";

export default function JobGrid({ jobs = [] }) {
  if (!jobs.length) {
    return (
      <div className="text-white/60 text-center mt-6">
        No jobs to display.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {jobs.map((j) => (
        <JobCard key={j.id} job={j} />
      ))}
    </div>
  );
}
