import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
} from "framer-motion";
import Dropzone from "./Dropzone";
import { analyzeResume } from "../services/api";
import { ChevronDown } from "lucide-react";

const inputBase =
  "w-full rounded-xl bg-gray-50 border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition";

const labelBase = "block text-xs sm:text-sm font-medium text-gray-700 mb-1";

export default function UploadCard({ onAnalyze, onReset }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [level, setLevel] = useState("entry-level");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingStep, setLoadingStep] = useState(0);

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const loadingSteps = [
    "Calculating ATS score…",
    "Calculating how well your skills match…",
    "Calculating your content quality score…",
    "Calculating structure score…",
    "Generating improvement suggestions…",
  ];

  useEffect(() => {
    if (!loading) return;

    setLoadingStep(0);

    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(interval); 
          return prev;
        }
        return prev + 1;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  async function submit(e) {
    e.preventDefault();

    if (!file) return setError("Please upload a resume.");
    if (!jobDescription) return setError("Please provide a job description.");

    setLoading(true);
    setError("");

    try {
      const result = await analyzeResume(file, jobDescription, title);
      onAnalyze({
        name: name || "Applicant",
        title: title || "Target Role",
        fileName: file.name,
        file,
        suggestions: result?.improvements_suggestion.key_points,
        overallScore: result?.overall_score,
        scores: result?.scores,
      });
    } catch {
      setError("Resume analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      className="px-4 sm:px-6"
    >
      {/* Heading */}
      <div className="text-center my-8 sm:my-10 space-y-2 sm:space-y-3">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-dark">
          Smart Feedback
        </h2>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-dark">
          For Your Dream Job
        </h2>
      </div>

      {/* Form */}
      <motion.form
        onSubmit={submit}
        className="relative w-full max-w-xl mx-auto
        bg-gray-50 border border-gray-200 rounded-3xl
        p-5 sm:p-6 lg:p-8
        space-y-6 shadow-lg"
      >
        {error && (
          <div className="p-3 rounded-xl bg-red-100 border border-red-300 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Inputs */}
        <div className="grid gap-5 sm:gap-6">
          {/* <div>
            <label className={labelBase}>Full name</label>
            <input
              placeholder="e.g. Alex Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputBase}
            />
          </div> */}

          <div>
            <label className={labelBase}>Target job title</label>
            <input
              required
              placeholder="e.g. Frontend Engineer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputBase}
            />
          </div>

          <div>
            <label className={labelBase}>Experience level</label>
            <div className="relative">
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className={`${inputBase} appearance-none cursor-pointer`}
              >
                <option value="entry-level">Entry level</option>
                <option value="mid-level">Mid level</option>
                <option value="senior-level">Senior level</option>
              </select>
              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className={labelBase}>Job description</label>
            <textarea
              required
              rows={4}
              placeholder="e.g. Looking for a React developer with experience in Tailwind and APIs…"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className={`${inputBase} resize-none leading-relaxed custom-scrollbar`}
            />
          </div>
        </div>

        {/* Dropzone */}
        <div className="space-y-2">
          <Dropzone onFile={setFile} />
          <AnimatePresence>
            {file && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-gray-700 break-all"
              >
                Selected file:{" "}
                <strong className="text-gray-900">{file.name}</strong>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4">
          <motion.button
            whileHover={{
              boxShadow: "0px 0px 12px rgba(59,130,246,0.25)",
            }}
            type="submit"
            disabled={loading}
            onClick={() => {
              onReset?.();
            }}
            className="w-full sm:w-auto px-7 py-3 rounded-xl
            bg-gradient-to-r from-[#3b82f6] to-[#415ead]
            text-sm font-semibold text-white shadow-md
            disabled:opacity-50 disabled:cursor-not-allowed
            transition active:scale-95 cursor-pointer"
          >
            {loading ? "Analyzing…" : "Analyze"}
          </motion.button>

          <button
            type="button"
            onClick={() => {
              setName("");
              setTitle("");
              setJobDescription("");
              setFile(null);
              setError("");
              onReset?.();
            }}
            className="w-full sm:w-auto px-8 py-3 rounded-xl
            bg-gray-100 border border-gray-300
            text-sm text-gray-900 hover:bg-gray-200
            transition active:scale-95 cursor-pointer"
          >
            Reset
          </button>
        </div>

        {/* Loader Overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20
              flex flex-col items-center justify-center gap-4
              rounded-3xl bg-white/80 backdrop-blur-sm px-6"
            >
              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />

              <motion.p
                key={loadingStep}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-sm sm:text-base lg:text-lg
                font-medium text-blue-700 text-center"
              >
                {loadingSteps[loadingStep]}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </motion.div>
  );
}
