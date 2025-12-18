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
  "w-full rounded-xl bg-gray-900/60 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500 transition";
const labelBase = "block text-sm font-medium text-white/80 mb-1";

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
    } catch (err) {
      setError("Resume analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} className="px-4">
      <div className="text-center my-8 space-y-3">
        <h2 className="text-4xl font-bold text-gradient">Smart Feedback</h2>
        <h2 className="text-4xl font-bold text-gradient">For Your Dream Job</h2>
      </div>

      <motion.form
        onSubmit={submit}
        className="w-full max-w-xl mx-auto bg-gradient-to-br from-gray-900/40 via-gray-900/30 to-gray-800/40 border border-white/10 rounded-3xl p-8 space-y-6 backdrop-blur-md"
      >
        {error && (
          <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="grid gap-8">
          <div>
            <label className={labelBase}>Full name</label>
            <input
              placeholder="e.g. Alex Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputBase}
            />
          </div>

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
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50"
              />
            </div>
          </div>

          <div>
            <label className={labelBase}>Job description</label>
            <textarea
              required
              rows={5}
              placeholder="e.g. Looking for a React developer with experience in Tailwind and APIs…"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className={`${inputBase} resize-none leading-relaxed`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="w-full">
            <Dropzone onFile={setFile} />
          </div>
          <AnimatePresence>
            {file && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-white/70"
              >
                Selected file:{" "}
                <strong className="text-white">{file.name}</strong>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-sm font-semibold text-white shadow-lg disabled:opacity-50"
          >
            {loading ? "Analyzing…" : "Get Feedback"}
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
            className="px-7 py-3 rounded-xl bg-white/10 border border-white/20 text-sm text-white hover:bg-white/15 transition"
          >
            Reset
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}
