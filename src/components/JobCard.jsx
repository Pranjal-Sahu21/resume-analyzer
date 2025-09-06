import React from "react";

export default function JobCard({ job }) {

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 w-full hover:bg-white/10 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-white font-semibold text-lg">{job.jobTitle}</div>
          <div className="text-xs md:text-sm text-white/60 mt-1">
            {job.companyName}
          </div>
        </div>
        <div className="text-sm md:text-base font-semibold text-green-400">
          {job.feedback.overallScore}%
        </div>
      </div>
      <div className="flex justify-around mt-4">
        <img src={job.imagePath} alt="examples" className="h-70 w-fit rounded-xl" />
        <div className="flex flex-col justify-between gap-3 text-white text-sm md:text-base ml-6">
          <div>
            <p className="min-w-[90px] font-semibold">
              ATS : {job.feedback.ATS.score}
            </p>
          </div>
          <div>
            <p className="min-w-[90px] font-semibold">
              Tone : {job.feedback.toneAndStyle.score}
            </p>
          </div>
          <div>
            <p className="min-w-[90px] font-semibold">
              Content : {job.feedback.content.score}
            </p>
          </div>
          <div>
            <p className="min-w-[90px] font-semibold">
              Structure : {job.feedback.structure.score}
            </p>
          </div>
          <div>
            <p className="min-w-[90px] font-semibold">
              Skills : {job.feedback.skills.score}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
