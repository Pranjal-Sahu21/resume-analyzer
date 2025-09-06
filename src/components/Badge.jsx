import React from "react";

export default function Badge({ severity }) {
  const map = {
    critical: "bg-red-500/90",
    high: "bg-orange-400/90",
    medium: "bg-yellow-400/90",
    low: "bg-emerald-400/90",
  };
  return (
    <span
      className={`text-xs px-3 py-1 rounded-full text-white shadow-sm ${
        map[severity] || "bg-white/10"
      }`}
    >
      {severity}
    </span>
  );
}
