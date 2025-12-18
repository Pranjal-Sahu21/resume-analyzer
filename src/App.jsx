import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import UploadCard from "./components/UploadCard";
import JobGrid from "./components/JobGrid";
import ResumeReview from "./components/ResumeReview";

export default function App() {
  const [showResult, setShowResult] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const currentYear = new Date().getFullYear();
  const resultRef = useRef(null);

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
    setShowResult(true);

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

  useEffect(() => {
    if (showResult) {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showResult]);

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-white" />
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
          <UploadCard
            onAnalyze={handleAnalyze}
            onReset={() => setShowResult(false)}
          />
        </motion.section>

        <AnimatePresence>
          {showResult && analysis && (
            <motion.div
              ref={resultRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ResumeReview analysis={analysis} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 bg-blue-50 text-center text-gray-600 py-6 text-sm border-t border-gray-300">
        <p>&copy; {currentYear} ResuScope. All rights reserved.</p>
      </footer>
    </div>
  );
}
