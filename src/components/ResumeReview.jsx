import React from "react";
import Progress from "./Progress";
import ReviewItem from "./ReviewItem";

export default function ResumeReview({
  analysis = { name: "Candidate", title: "Unknown Role" },
}) {
  const items = [
    {
      id: 1,
      title: "ATS Keyword Match",
      description: "Missing keywords like React and AWS.",
      severity: "high",
      impact: "+12%",
    },
    {
      id: 2,
      title: "Concise Summary",
      description: "Make your summary more role-specific.",
      severity: "medium",
      impact: "+6%",
    },
    {
      id: 3,
      title: "Formatting",
      description: "Use consistent date formatting.",
      severity: "low",
      impact: "+2%",
    },
    {
      id: 4,
      title: "Actionable Metrics",
      description: "Add measurable results in achievements.",
      severity: "critical",
      impact: "+18%",
    },
  ];

  const score = 78;

  return (
    <div className="bg-white/5 border border-white/6 rounded-2xl p-6 w-full h-full max-w-xl shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-white font-semibold text-lg">Resume Review</div>
          <div className="text-xs md:text-sm text-white/60">
            {analysis?.name || "Candidate"} —{" "}
            {analysis?.title || "Unknown Role"}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-white/60">ATS score</div>
          <div className="text-2xl font-bold text-white">{score}%</div>
        </div>
      </div>

      <div className="mt-4">
        <Progress value={score} />
      </div>

      <div className="mt-4 flex gap-3">
        <div className="flex-1 bg-white/6 p-4 rounded-lg shadow-sm">
          <div className="text-xs text-white/60">Experience match</div>
          <div className="text-white font-semibold">Strong</div>
        </div>
        <div className="flex-1 bg-white/6 p-4 rounded-lg shadow-sm">
          <div className="text-xs text-white/60">Skills</div>
          <div className="text-white font-semibold">Improve keywords</div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {items.map((it) => (
          <ReviewItem key={it.id} item={it} />
        ))}
      </div>

      <div className="mt-6 text-right">
        <button className="px-5 py-2.5 cursor-pointer rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg hover:brightness-110 transition">
          Download suggestions
        </button>
      </div>
    </div>
  );
}
