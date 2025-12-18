import React from "react";
import Progress from "./Progress";

export default function ResumeReview({ analysis }) {
  if (!analysis) return null;

  const getSeverity = (score) => {
    if (score >= 80) return "low";
    if (score >= 60) return "medium";
    if (score >= 40) return "high";
    return "critical";
  };

  const items = [
    {
      key: "ats",
      title: "ATS Score",
      score: analysis.scores.ats_compatibility_score,
    },
    {
      key: "skills",
      title: "Skills Match",
      score: analysis.scores.skill_match_score,
    },
    {
      key: "content",
      title: "Content Quality",
      score: analysis.scores.content_quality_score,
    },
    {
      key: "structure",
      title: "Structure",
      score: analysis.scores.structure_score,
    },
  ];

  const overallScore = analysis.overallScore;

  return (
    <div
      className="bg-gray-50 border border-gray-200 rounded-2xl shadow-md
      p-5 sm:p-6 lg:p-8
      max-w-5xl mx-auto
      grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* LEFT */}
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-4 sm:mt-6">
          <div>
            <h2 className="text-gray-900 text-lg sm:text-xl font-bold">
              Resume Review
            </h2>
            {/* <p className="text-gray-700 text-sm mt-1">
              {analysis.name} — {analysis.title}
            </p>
            <p className="text-gray-500 text-xs mt-1 truncate max-w-[260px] sm:max-w-none">
              Selected file: {analysis.fileName}
            </p> */}
          </div>

          <div className="sm:text-right">
            <div className="text-xs text-gray-600">Overall score</div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">
              {overallScore}%
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <Progress value={overallScore} />
        </div>

        {/* Scores */}
        <div className="mt-8 sm:mt-12 mb-8 sm:mb-12 space-y-4 sm:space-y-8">
          {items.map((item) => (
            <div
              key={item.key}
              className="border-l-4 border-blue-400 bg-blue-50/70
                rounded-lg pl-4 pr-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-gray-900 font-semibold py-4 text-sm sm:text-base">
                  {item.title}
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      getSeverity(item.score) === "critical"
                        ? "bg-red-500"
                        : getSeverity(item.score) === "high"
                        ? "bg-orange-400"
                        : getSeverity(item.score) === "medium"
                        ? "bg-yellow-400"
                        : "bg-green-500"
                    }`}
                  />
                  <span className="text-gray-900 font-semibold text-sm">
                    {item.score}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div
        className="bg-blue-50 rounded-2xl shadow-inner
        p-5 sm:p-6 lg:p-7
        flex flex-col gap-5 sm:gap-6"
      >
        <div>
          <h3 className="text-gray-900 text-lg sm:text-xl font-semibold mb-2">
            Summary
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            {overallScore >= 80
              ? "Your resume is strong and well-aligned with the target role."
              : overallScore >= 60
              ? "Your resume has good potential but needs some improvements."
              : overallScore >= 40
              ? "Your resume needs significant improvements."
              : "Your resume requires substantial revision."}
          </p>
        </div>

        {analysis.suggestions?.length > 0 && (
          <div className="border-t border-gray-300 pt-4">
            <h4 className="text-gray-900 font-semibold text-sm mb-3 mt-2">
              Key Improvement Suggestions
            </h4>

            <ul className="space-y-3 mt-4">
              {analysis.suggestions.map((tip, index) => (
                <li
                  key={index}
                  className="flex gap-2 text-gray-700 text-sm leading-relaxed"
                >
                  <span className="text-green-500 mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
