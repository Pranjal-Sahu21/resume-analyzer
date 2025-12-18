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

  const overallScore = analysis.overallScore;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT */}
      <div>
        <div className="flex justify-between mt-6">
          <div>
            <h2 className="text-white text-xl font-bold">Resume Review</h2>
            <p className="text-sm text-white/60 mt-2">
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

        <div className="mt-12 mb-12 space-y-8">
          {items.map((item) => (
            <div key={item.key} className="border-l-4 border-white/10 pl-4">
              <div className="flex justify-between gap-2">
                <div className="flex-1">
                  <div className="text-white font-semibold py-4">
                    {item.title}
                  </div>
                </div>

                <div className="text-right flex items-center gap-2">
                  {/* Severity indicator */}
                  <span
                    className={`w-3 h-3 rounded-full ${
                      getSeverity(item.score) === "critical"
                        ? "bg-red-500"
                        : getSeverity(item.score) === "high"
                        ? "bg-orange-400"
                        : getSeverity(item.score) === "medium"
                        ? "bg-yellow-400"
                        : "bg-emerald-400"
                    }`}
                  />

                  {/* Percentage value */}
                  <span className="text-white font-semibold text-sm">
                    {item.score}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* RIGHT */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-7 flex flex-col gap-6">
        <div>
          <h3 className="text-white text-xl font-semibold tracking-tight mb-2">
            Summary
          </h3>

          <p className="text-white/80 text-sm leading-relaxed">
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
          <div className="border-t border-white/10 pt-4">
            <h4 className="text-white font-semibold text-sm mb-3 mt-4">
              Key Improvement Suggestions
            </h4>

            <ul className="space-y-8 mt-8">
              {analysis.suggestions.map((tip, index) => (
                <li
                  key={index}
                  className="flex gap-2 text-white/70 text-sm leading-relaxed"
                >
                  <span className="text-emerald-400 mt-1">•</span>
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
