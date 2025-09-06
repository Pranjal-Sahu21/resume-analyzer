import React from "react";

export default function JobCard({ job }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 w-full hover:bg-white/10 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-white font-semibold text-lg">{job.role}</div>
          <div className="text-xs md:text-sm text-white/60 mt-1">
            {job.company}
          </div>
        </div>
        <div className="text-sm md:text-base font-semibold text-green-400">
          {job.score}%
        </div>
      </div>
      <div className="mt-3 text-xs md:text-sm text-white/70">{job.snippet}</div>
    </div>
  );
}
