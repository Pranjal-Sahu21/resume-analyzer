import React, { useState } from "react";
import Dropzone from "./Dropzone";
import { motion } from "framer-motion";

export default function UploadCard({ onAnalyze }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e?.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAnalyze({
        name: name || "Applicant",
        title: title || "Software Engineer",
        fileName: file?.name,
      });
    }, 500);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center px-4"
    >
      <div className="text-center my-6 space-y-2">
        <h2
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold tracking-wide text-gradient"
        >
          Smart Feedback
        </h2>

        <h2
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold tracking-wide text-gradient"
        >
          For Your Dream Job
        </h2>
      </div>

      <motion.form
        onSubmit={submit}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-gray-900/40 via-gray-900/30 to-gray-800/40 border border-white/10 rounded-3xl p-6 w-full max-w-xl shadow-2xl backdrop-blur-md"
      >
        <p className="text-white/60 mt-1 text-sm md:text-base text-center">
          Upload your resume and target job to get tailored feedback & ATS
          score.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div>
            <label className="text-xs text-white/60 md:text-sm">
              Full name
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="text-xs text-white/60 md:text-sm">
              Target title
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 p-3 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              placeholder="Product Designer"
            />
          </div>
        </div>

        <div className="mt-5">
          <Dropzone onFile={(f) => setFile(f)} />
          {file && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-sm text-white/70"
            >
              Selected file: <strong className="text-white">{file.name}</strong>
            </motion.div>
          )}
        </div>

        <div className="mt-5 flex gap-3 items-center justify-center">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(255,255,255,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold shadow-lg hover:brightness-110 transition-all"
          >
            {loading ? "Analyzing..." : "Get Feedback"}
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.15)",
            }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => {
              setName("");
              setTitle("");
              setFile(null);
            }}
            className="px-5 py-2 rounded-2xl bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all"
          >
            Reset
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
}
