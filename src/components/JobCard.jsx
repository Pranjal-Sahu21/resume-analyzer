import React from "react";

export default function JobCard({ job }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 w-full hover:bg-white/10 transition">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-white font-semibold">{job.role}</div>
          <div className="text-xs text-white/60">{job.company}</div>
        </div>
        <div className="text-sm font-semibold text-green-400">{job.score}%</div>
      </div>
      <div className="mt-3 text-xs text-white/70">{job.snippet}</div>
    </div>
  );
}
