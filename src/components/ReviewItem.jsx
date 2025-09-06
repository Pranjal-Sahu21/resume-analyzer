import React from "react";
import Badge from "./Badge";

export default function ReviewItem({ item }) {
  return (
    <div className="border-l-4 border-white/6 pl-4 pb-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-white font-semibold">{item.title}</div>
          <div className="text-xs text-white/60 mt-1">{item.description}</div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge severity={item.severity} />
          <div className="text-xs text-white/50">{item.impact}</div>
        </div>
      </div>
    </div>
  );
}
