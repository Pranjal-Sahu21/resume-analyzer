import React, { useState } from "react";
import Progress from "./Progress";
import {
  optimizeSkills,
  optimizeStructure,
  optimizeContent,
  optimizeTone,
} from "../services/api";

export default function ResumeReview({ analysis }) {
  const [optimizationResults, setOptimizationResults] = useState({});
  const [loading, setLoading] = useState({});

  if (!analysis) return null;

  const handleOptimize = async (key) => {
    if (!analysis.file) return;

    setLoading((prev) => ({ ...prev, [key]: true }));

    try {
      let result;

      switch (key) {
        case "skills":
          result = await optimizeSkills(analysis.file, analysis.title);
          break;
        case "structure":
          result = await optimizeStructure(analysis.file);
          break;
        case "content":
          result = await optimizeContent(analysis.file);
          break;
        case "tone":
          result = await optimizeTone(analysis.file);
          break;
        default:
          return;
      }

      setOptimizationResults((prev) => ({
        ...prev,
        [key]:
          result?.feedback ||
          result?.message ||
          "Optimization completed successfully.",
      }));
    } catch (error) {
      console.error(error);
      setOptimizationResults((prev) => ({
        ...prev,
        [key]: "Failed to fetch optimization feedback.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  const getSeverity = (score) => {
    if (score >= 80) return "low";
    if (score >= 60) return "medium";
    if (score >= 40) return "high";
    return "critical";
  };

  const getImpact = (score) => `+${Math.round((100 - score) * 0.4)}%`;

  const items = [
    {
      key: "ats",
      title: "ATS Score",
      score: analysis.scores.ats_compatibility_score,
      description: "How well your resume matches ATS requirements.",
      disabled: true,
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

  const overallScore = analysis.overall_score;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT */}
      <div>
        <div className="flex justify-between">
          <div>
            <h2 className="text-white text-xl font-bold">Resume Review</h2>
            <p className="text-sm text-white/60">
              {analysis.name} — {analysis.title}
            </p>
            <p className="text-xs text-white/40 mt-1">
              Selected file: {analysis.fileName}
            </p>
          </div>

          <div className="text-right">
            <div className="text-xs text-white/60">Overall score</div>
            <div className="text-3xl font-bold text-white">{overallScore}%</div>
          </div>
        </div>

        <div className="mt-4">
          <Progress value={overallScore} />
        </div>

        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div key={item.key} className="border-l-4 border-white/10 pl-4">
              <div className="flex justify-between gap-4">
                <div className="flex-1">
                  <div className="text-white font-semibold">{item.title}</div>

                  <div className="text-xs text-white/60 mt-1">
                    {optimizationResults[item.key] ||
                      item.description ||
                      "Click below for improvement suggestions."}
                  </div>

                  {!item.disabled && (
                    <button
                      onClick={() => handleOptimize(item.key)}
                      disabled={loading[item.key]}
                      className="mt-2 text-xs text-indigo-400 hover:text-indigo-300 disabled:opacity-50"
                    >
                      {loading[item.key]
                        ? "Optimizing..."
                        : "Get optimization tips"}
                    </button>
                  )}
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs px-3 py-1 rounded-full text-white ${
                      getSeverity(item.score) === "critical"
                        ? "bg-red-500"
                        : getSeverity(item.score) === "high"
                        ? "bg-orange-400"
                        : getSeverity(item.score) === "medium"
                        ? "bg-yellow-400"
                        : "bg-emerald-400"
                    }`}
                  >
                    {item.score}%
                  </span>
                  <div className="text-xs text-white/50 mt-1">
                    {getImpact(item.score)} potential
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="bg-white/10 rounded-xl p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-white text-xl font-bold mb-3">Summary</h3>

          <p className="text-white/80 text-sm">
            {overallScore >= 80
              ? "Your resume is strong and well-aligned with the target role."
              : overallScore >= 60
              ? "Your resume has good potential but needs some improvements."
              : overallScore >= 40
              ? "Your resume needs significant improvements."
              : "Your resume requires substantial revision."}
          </p>

          {analysis.suggestions?.length > 0 && (
            <div className="mt-4">
              <h4 className="text-white font-semibold mb-2">
                Key Improvement Suggestions
              </h4>
              <ul className="list-disc list-inside text-white/70 text-sm space-y-1">
                {analysis.suggestions.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button className="mt-6 w-full px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg">
          Download full report
        </button>
      </div>
    </div>
  );
}
