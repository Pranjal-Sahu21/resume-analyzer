import React, { useState } from "react";
import Header from "./components/Header";
import UploadCard from "./components/UploadCard";
import JobGrid from "./components/JobGrid";
import ResumeReview from "./components/ResumeReview";

export default function App() {
  const jobs = [
    {
      id: 1,
      role: "Frontend Developer",
      company: "OpenAI",
      score: 92,
      snippet: "Built responsive UIs with React and Tailwind CSS.",
    },
    {
      id: 2,
      role: "Backend Developer",
      company: "Tech Corp",
      score: 85,
      snippet: "Designed RESTful APIs and optimized database queries.",
    },
  ];
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = (data) => {
    setAnalysis(data);
    // Smooth scroll to review section after analyzing
    setTimeout(() => {
      const reviewSection = document.getElementById("review-section");
      if (reviewSection) {
        reviewSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Header with Upload button */}
      <Header
        onUploadClick={() => {
          const uploadSection = document.getElementById("upload-section");
          if (uploadSection) {
            uploadSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }}
      />

      <main className="px-6 md:px-12 lg:px-24 py-12 space-y-24">
        {/* Upload Section */}
        <JobGrid jobs={jobs} />
        <div id="upload-section" className="flex justify-center">
          <UploadCard onAnalyze={handleAnalyze} />
        </div>

        {/* Resume Review Section */}
        {analysis && (
          <div id="review-section">
            <ResumeReview analysis={analysis} />
          </div>
        )}
      </main>
    </div>
  );
}
