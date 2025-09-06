import React from "react";

export default function Progress({ value }) {
  return (
    <div className="w-full bg-white/6 rounded-full h-3 overflow-hidden">
      <div
        className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-green-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
