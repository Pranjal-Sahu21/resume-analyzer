// src/components/UploadCard.js
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Dropzone from "./Dropzone";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
} from "framer-motion";

export default function UploadCard({ onAnalyze }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [level, setLevel] = useState("entry-level");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  function submit(e) {
    e?.preventDefault();

    if (!file) {
      setError("Please upload a file before submitting.");
      return;
    }

    if (!jobDescription) {
      setError("Please provide a job description.");
      return;
    }

    setLoading(true);
    setError("");

    // ✅ Simple fixed data instead of API
    setTimeout(() => {
      onAnalyze({
        name: name || "Applicant",
        title: title || "Software Engineer",
        fileName: file.name,
        scores: {
          ats_score: 75,
          SKILL_SCORE: 70,
          Content_score: 65,
          "tone & style score": 60,
          structure_score: 68,
        },
      });
      setLoading(false);
    }, 800); // small delay for UX
  }

  const popUp = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    }),
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      className="flex flex-col items-center px-4"
    >
      {/* Headers */}
      <div className="text-center my-6 space-y-2">
        <motion.h2
          custom={0}
          variants={popUp}
          initial="hidden"
          animate="visible"
          className="text-4xl font-bold tracking-wide text-gradient max-lg:text-3xl"
        >
          Smart Feedback
        </motion.h2>
        <motion.h2
          custom={1}
          variants={popUp}
          initial="hidden"
          animate="visible"
          className="text-4xl font-bold tracking-wide text-gradient max-lg:text-3xl"
        >
          For Your Dream Job
        </motion.h2>
      </div>

      {/* Form */}
      <motion.form
        onSubmit={submit}
        variants={popUp}
        custom={2}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="bg-gradient-to-br from-gray-900/40 via-gray-900/30 to-gray-800/40 border mt-4 border-white/10 rounded-3xl p-6 w-full max-w-xl shadow-2xl backdrop-blur-md"
      >
        <motion.p
          variants={fadeIn}
          className="text-white/60 mt-1 text-sm md:text-base text-center"
        >
          Upload your resume and target job to get simple offline feedback.
        </motion.p>

        {error && (
          <motion.div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
            {error}
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-4 mt-5">
          <motion.div variants={fadeIn}>
            <label className="text-xs text-white/60 md:text-sm">
              Full name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="w-full mt-1 p-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            />
          </motion.div>

          <motion.div variants={fadeIn}>
            <label className="text-xs text-white/60 md:text-sm">
              Target job title
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Product Designer"
              className="w-full mt-1 p-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            />
          </motion.div>

          <motion.div variants={fadeIn}>
            <label className="text-xs text-white/60 md:text-sm">
              Experience level
            </label>
            <div className="relative w-full mt-1">
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-3 pr-10 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 appearance-none cursor-pointer hover:bg-white/20"
              >
                <option value="entry-level" className="bg-gray-900 text-white">
                  Entry Level
                </option>
                <option value="mid-level" className="bg-gray-900 text-white">
                  Mid Level
                </option>
                <option value="senior-level" className="bg-gray-900 text-white">
                  Senior Level
                </option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none"
              />
            </div>
          </motion.div>

          <motion.div variants={fadeIn}>
            <label className="text-xs text-white/60 md:text-sm">
              Job description
            </label>
            <textarea
              required
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              rows="4"
              className="w-full mt-1 p-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            />
          </motion.div>
        </div>

        <motion.div variants={fadeIn} className="mt-5">
          <Dropzone onFile={(f) => setFile(f)} />
          <AnimatePresence>
            {file && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-2 text-sm text-white/70"
              >
                Selected file:{" "}
                <strong className="text-white">{file.name}</strong>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="mt-5 flex gap-3 items-center justify-center"
        >
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 15px rgba(255,255,255,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 cursor-pointer rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Analyzing..." : "Get Feedback"}
          </motion.button>

          <motion.button
            type="button"
            onClick={() => {
              setName("");
              setTitle("");
              setJobDescription("");
              setFile(null);
              setError("");
            }}
            className="px-5 py-2 rounded-2xl bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all"
          >
            Reset
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
