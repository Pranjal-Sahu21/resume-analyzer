import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import UploadCard from "./components/UploadCard";
import JobGrid from "./components/JobGrid";
import ResumeReview from "./components/ResumeReview";

export default function App() {
  const jobs = [
    {
        id: "1",
        companyName: "Google",
        jobTitle: "Frontend Developer",
        imagePath: "/images/resume_01.png",
        resumePath: "/resumes/resume-1.pdf",
        feedback: {
            overallScore: 85,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "2",
        companyName: "Microsoft",
        jobTitle: "Cloud Engineer",
        imagePath: "/images/resume_02.png",
        resumePath: "/resumes/resume-2.pdf",
        feedback: {
            overallScore: 55,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
    {
        id: "3",
        companyName: "Apple",
        jobTitle: "iOS Developer",
        imagePath: "/images/resume_03.png",
        resumePath: "/resumes/resume-3.pdf",
        feedback: {
            overallScore: 75,
            ATS: {
                score: 90,
                tips: [],
            },
            toneAndStyle: {
                score: 90,
                tips: [],
            },
            content: {
                score: 90,
                tips: [],
            },
            structure: {
                score: 90,
                tips: [],
            },
            skills: {
                score: 90,
                tips: [],
            },
        },
    },
  ];
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = (data) => {
    setAnalysis(data);

    const scrollToReview = () => {
      const el = document.getElementById("review-section");
      if (!el) return;
      const headerEl =
        document.querySelector("header") ||
        document.querySelector('[role="banner"]');
      const headerHeight = headerEl
        ? headerEl.getBoundingClientRect().height
        : 0;
      const top =
        el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
      window.scrollTo({ top, behavior: "smooth" });
    };

    requestAnimationFrame(() => requestAnimationFrame(scrollToReview));
    setTimeout(scrollToReview, 600);
  };

  // Base fade-in with optional delay
  const fadeInUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay },
    },
  });

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Background gradient + overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 animate-gradient bg-[length:400%_400%]" />
        <div className="absolute inset-0 bg-black/60" />

        {/* Background glows (contained so they don’t extend layout) */}
        <div className="absolute top-[-10rem] left-[-10rem] w-[20rem] h-[20rem] bg-blue-800/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[20rem] h-[20rem] translate-x-1/2 translate-y-1/2 bg-gray-700/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <div className="relative z-10">
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
      </div>

      {/* Main content */}
      <main className="relative z-10 px-6 md:px-12 lg:px-24 py-16 space-y-32">
        {/* Job Grid */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp(0)}
        >
          <JobGrid jobs={jobs} />
        </motion.section>

        {/* Upload */}
        <motion.section
          id="upload-section"
          className="flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp(0.3)}
        >
          <UploadCard onAnalyze={handleAnalyze} />
        </motion.section>

        {/* Resume Review */}
        {analysis && (
          <motion.section
            id="review-section"
            className="scroll-mt-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp(0.6)}
          >
            <ResumeReview analysis={analysis} />
          </motion.section>
        )}
      </main>

      <footer className="relative z-10 text-center text-white/40 py-6 text-sm">
        🚀 Powered by Smart Resume Review
      </footer>
    </div>
  );
}
