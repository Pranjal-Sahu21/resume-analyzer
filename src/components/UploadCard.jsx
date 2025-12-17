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
import { analyzeResume } from "../services/api";

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

  async function submit(e) {
    e.preventDefault();

    if (!file) {
      setError("Please upload a resume.");
      return;
    }

    if (!jobDescription) {
      setError("Please provide a job description.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await analyzeResume(file, jobDescription, title);

      onAnalyze({
        name: name || "Applicant",
        title: title || "Target Role",
        fileName: file.name,
        file, // 🔑 needed for optimize endpoints
        scores: result.scores, // must match API response
      });
    } catch (err) {
      console.error(err);
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
      className="flex flex-col items-center px-4"
    >
      {/* Header */}
      <div className="text-center my-6 space-y-2">
        <h2 className="text-4xl font-bold text-gradient">Smart Feedback</h2>
        <h2 className="text-4xl font-bold text-gradient">For Your Dream Job</h2>
      </div>

      <motion.form
        onSubmit={submit}
        className="bg-gradient-to-br from-gray-900/40 via-gray-900/30 to-gray-800/40 border mt-4 border-white/10 rounded-3xl p-6 w-full max-w-xl shadow-2xl backdrop-blur-md"
      >
        <p className="text-white/60 text-center text-sm">
          Upload your resume and job description for AI analysis.
        </p>

        {error && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 mt-5">
          <input
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />

          <input
            required
            placeholder="Target job title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="input"
          >
            <option value="entry-level">Entry level</option>
            <option value="mid-level">Mid level</option>
            <option value="senior-level">Senior level</option>
          </select>

          <textarea
            required
            rows="4"
            placeholder="Paste job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="input"
          />
        </div>

        {/* File Upload */}
        <div className="mt-5">
          <Dropzone onFile={setFile} />
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
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3 justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Get Feedback"}
          </button>

          <button
            type="button"
            onClick={() => {
              setName("");
              setTitle("");
              setJobDescription("");
              setFile(null);
              setError("");
            }}
            className="px-6 py-3 rounded-xl bg-white/10 text-white border border-white/20"
          >
            Reset
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}
