import React, { useState } from "react";
import Dropzone from "./DropZone";

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
    <form
      onSubmit={submit}
      className="bg-white/4 border border-white/6 rounded-2xl p-6 w-full max-w-xl"
    >
      <h2 className="text-white text-xl font-semibold">
        Smart feedback for your dream job
      </h2>
      <p className="text-white/60 mt-1 text-sm">
        Upload your resume and target job to get tailored feedback & ATS score.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
        <div>
          <label className="text-xs text-white/60">Full name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2 rounded-md bg-white/6 text-white"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="text-xs text-white/60">Target title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 p-2 rounded-md bg-white/6 text-white"
            placeholder="Product Designer"
          />
        </div>
      </div>

      <div className="mt-4">
        <Dropzone onFile={(f) => setFile(f)} />
        {file && (
          <div className="mt-2 text-sm text-white/70">
            Selected file: <strong className="text-white">{file.name}</strong>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2 items-center">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold disabled:opacity-60"
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
          className="px-3 py-2 rounded-md bg-white/6 text-white"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
