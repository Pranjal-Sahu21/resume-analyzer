import React from "react";
import Progress from "./Progress";
import ReviewItem from "./ReviewItem";

export default function ResumeReview({
  analysis = {
    name: "Candidate",
    title: "Unknown Role",
    summary:
      "Your resume shows strong experience alignment but could be improved by adding more measurable achievements, keyword optimization, and consistent formatting.",
  },
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
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-5xl shadow-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column - Review Details */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-bold text-xl">Resume Review</div>
            <div className="text-sm text-white/60">
              {analysis?.name || "Candidate"} —{" "}
              {analysis?.title || "Unknown Role"}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/60">ATS score</div>
            <div className="text-3xl font-extrabold text-white">{score}%</div>
          </div>
        </div>

        <div className="mt-4">
          <Progress value={score} />
        </div>

        <div className="mt-4 flex gap-4">
          <div className="flex-1 bg-white/10 p-5 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="text-xs text-white/60">Experience match</div>
            <div className="text-white font-semibold text-lg">Strong</div>
          </div>
          <div className="flex-1 bg-white/10 p-5 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="text-xs text-white/60">Skills</div>
            <div className="text-white font-semibold text-lg">
              Improve keywords
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {items.map((it) => (
            <ReviewItem key={it.id} item={it} />
          ))}
        </div>

        <div className="mt-6 text-right">
          <button className="px-6 py-3 cursor-pointer rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 hover:brightness-110 transition">
            Download suggestions
          </button>
        </div>
      </div>

      {/* Right Column - Summary */}
      <div className="bg-white/10 rounded-xl p-6 flex flex-col justify-between shadow-md">
        <div>
          <h2 className="text-white font-bold text-xl mb-3">Summary</h2>
          <p className="text-white/80 leading-relaxed text-sm md:text-base">
            {analysis?.summary || "No summary available."}
          </p>
        </div>

        {/* <div className="mt-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-white text-2xl font-bold">4</div>
              <div className="text-xs text-white/60">Suggestions</div>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-white text-2xl font-bold">+38%</div>
              <div className="text-xs text-white/60">Potential gain</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
