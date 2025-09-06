import React, { useState } from "react";
import Dropzone from "./Dropzone";

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
        fileName: file?.name || "resume.pdf",
      });
    }, 1200);
  }

  return (
    <form className="bg-white/4 border border-white/6 rounded-2xl p-6 w-full max-w-xl shadow-lg">
      <h2 className="text-white text-2xl font-semibold">
        Smart feedback for your dream job
      </h2>
      <p className="text-white/60 mt-1 text-sm md:text-base">
        Upload your resume and target job to get tailored feedback & ATS score.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <div>
          <label className="text-xs text-white/60 md:text-sm">Full name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-3 rounded-lg bg-white/6 text-white placeholder-white/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="text-xs text-white/60 md:text-sm">
            Target title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 p-3 rounded-lg bg-white/6 text-white placeholder-white/50 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Product Designer"
          />
        </div>
      </div>

      <div className="mt-5">
        <Dropzone onFile={(f) => setFile(f)} />
        {file && (
          <div className="mt-2 text-sm text-white/70">
            Selected file: <strong className="text-white">{file.name}</strong>
          </div>
        )}
      </div>

      <div className="mt-5 flex gap-3 items-center">
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg hover:brightness-110 transition disabled:opacity-60"
        >
          {loading ? "Analyzing..." : "Get feedback"}
        </button>
        <button
          type="button"
          onClick={() => {
            setName("");
            setTitle("");
            setFile(null);
          }}
          className="px-4 py-2 rounded-lg bg-white/6 text-white border border-white/10 hover:bg-white/10 transition"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
