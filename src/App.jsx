import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import UploadCard from "./components/UploadCard";
import JobGrid from "./components/JobGrid";
import ResumeReview from "./components/ResumeReview";

export default function App() {
  const [analysis, setAnalysis] = useState(null);
  const currentYear = new Date().getFullYear();

  const jobs = [
    {
      id: "1",
      companyName: "Google",
      jobTitle: "Frontend Developer",
      imagePath: "/images/resume_01.png",
      overallScore: "95",
    },
    {
      id: "2",
      companyName: "Microsoft",
      jobTitle: "Cloud Engineer",
      imagePath: "/images/resume_02.png",
      overallScore: "75",
    },
    {
      id: "3",
      companyName: "Apple",
      jobTitle: "iOS Developer",
      imagePath: "/images/resume_03.png",
      overallScore: "58",
    },
  ];

  const handleAnalyze = (data) => {
    setAnalysis(data);

    const scrollToReview = () => {
      const el = document.getElementById("review-section");
      if (!el) return;

      const header = document.querySelector("header");
      const offset = header ? header.offsetHeight : 0;

      const top =
        el.getBoundingClientRect().top + window.pageYOffset - offset - 16;

      window.scrollTo({ top, behavior: "smooth" });
    };

    requestAnimationFrame(() => requestAnimationFrame(scrollToReview));
    setTimeout(scrollToReview, 600);
  };

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
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 animate-gradient bg-[length:400%_400%]" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10">
        <Header
          onUploadClick={() =>
            document
              .getElementById("upload-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        />
      </div>

      <main className="relative z-10 px-6 md:px-12 lg:px-24 py-12 space-y-32">
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp()}
        >
          <JobGrid jobs={jobs} />
        </motion.section>

        <motion.section
          id="upload-section"
          className="flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp(0.2)}
        >
          <UploadCard onAnalyze={handleAnalyze} />
        </motion.section>

        {analysis && (
          <motion.section
            id="review-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp(0.4)}
          >
            <ResumeReview analysis={analysis} />
          </motion.section>
        )}
      </main>

      <footer className="relative z-10 text-center text-white/40 py-6 text-sm">
        <p>&copy; {currentYear} ResuScope. All rights reserved.</p>
      </footer>
    </div>
  );
}
