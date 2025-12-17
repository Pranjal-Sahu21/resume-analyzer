// src/components/ResumeReview.js
import React, { useState } from "react";
import Progress from "./Progress";

export default function ResumeReview({
  analysis = {
    name: "Candidate",
    title: "Unknown Role",
    fileName: "No file selected",
    scores: {
      ats_score: 75,
      SKILL_SCORE: 70,
      Content_score: 65,
      "tone & style score": 60,
      structure_score: 68,
    },
  },
}) {
  const [optimizationResults, setOptimizationResults] = useState({});

  const OPTIMIZATION_TIPS = {
    ats: "Use standard headings and avoid complex layouts.",
    skills: "Highlight relevant skills clearly and early.",
    content: "Add measurable achievements and results.",
    tone: "Keep language concise and professional.",
    structure: "Use consistent spacing and bullet points.",
  };

  const handleOptimize = (type) => {
    setOptimizationResults((prev) => ({
      ...prev,
      [type]: OPTIMIZATION_TIPS[type],
    }));
  };

  const getSeverity = (score) => {
    if (score >= 80) return "low";
    if (score >= 60) return "medium";
    if (score >= 40) return "high";
    return "critical";
  };

  const getImpact = (score) => {
    const potential = 100 - score;
    return `+${Math.round(potential * 0.4)}%`;
  };

  const items = [
    {
      id: 1,
      key: "ats",
      title: "ATS Score",
      description:
        optimizationResults.ats ||
        "How well your resume matches ATS requirements.",
      score: analysis.scores.ats_score,
    },
    {
      id: 2,
      key: "skills",
      title: "Skills Match",
      description:
        optimizationResults.skills ||
        "Relevance of your skills to the target job.",
      score: analysis.scores.SKILL_SCORE,
    },
    {
      id: 3,
      key: "content",
      title: "Content Quality",
      description:
        optimizationResults.content || "Quality and relevance of your content.",
      score: analysis.scores.Content_score,
    },
    {
      id: 4,
      key: "tone",
      title: "Tone & Style",
      description:
        optimizationResults.tone ||
        "Professionalism and appropriateness of tone.",
      score: analysis.scores["tone & style score"],
    },
    {
      id: 5,
      key: "structure",
      title: "Structure",
      description:
        optimizationResults.structure ||
        "Organization and readability of your resume.",
      score: analysis.scores.structure_score,
    },
  ];

  const overallScore = Math.round(
    items.reduce((sum, item) => sum + item.score, 0) / items.length
  );

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-5xl shadow-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-bold text-xl">Resume Review</div>
            <div className="text-sm text-white/60">
              {analysis.name} — {analysis.title}
            </div>
            <div className="text-xs text-white/40 mt-1">
              Selected file: {analysis.fileName}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/60">Overall score</div>
            <div className="text-3xl font-extrabold text-white">
              {overallScore}%
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Progress value={overallScore} />
        </div>

        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="border-l-4 border-white/10 pl-4 pb-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="text-white font-semibold">{item.title}</div>
                  <div className="text-xs text-white/60 mt-1">
                    {item.description}
                  </div>
                  <button
                    onClick={() => handleOptimize(item.key)}
                    className="mt-2 text-xs text-indigo-400 hover:text-indigo-300"
                  >
                    Get optimization tips
                  </button>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`text-xs px-3 py-1 rounded-full text-white ${
                      getSeverity(item.score) === "critical"
                        ? "bg-red-500/90"
                        : getSeverity(item.score) === "high"
                        ? "bg-orange-400/90"
                        : getSeverity(item.score) === "medium"
                        ? "bg-yellow-400/90"
                        : "bg-emerald-400/90"
                    }`}
                  >
                    {item.score}%
                  </span>
                  <div className="text-xs text-white/50">
                    {getImpact(item.score)} potential
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column */}
      <div className="bg-white/10 rounded-xl p-6 flex flex-col justify-between shadow-md">
        <div>
          <h2 className="text-white font-bold text-xl mb-3">Summary</h2>
          <p className="text-white/80 text-sm md:text-base">
            {overallScore >= 80
              ? "Your resume is strong and well-aligned with the target position."
              : overallScore >= 60
              ? "Your resume has good potential but could use improvements."
              : overallScore >= 40
              ? "Your resume needs significant improvements."
              : "Your resume requires substantial revision."}
          </p>
        </div>
        <button className="mt-6 w-full px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg">
          Download full report
        </button>
      </div>
    </div>
  );
}
