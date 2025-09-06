import React from "react";

export default function LoginCard() {
  return (
    <div className="bg-white/3 border border-white/6 rounded-2xl p-4 w-full max-w-sm drop-shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-indigo-500/80 flex items-center justify-center text-white">
          R
        </div>
        <div>
          <div className="text-sm text-white/80">Welcome back</div>
          <div className="text-white font-medium">Robert Taylor</div>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-xs text-white/60">Email</div>
        <input
          className="w-full bg-white/4 rounded-md mt-1 p-2 text-white placeholder-white/40"
          placeholder="robert@example.com"
        />
        <div className="text-xs text-white/60 mt-3">Password</div>
        <input
          className="w-full bg-white/4 rounded-md mt-1 p-2 text-white placeholder-white/40"
          type="password"
          placeholder="********"
        />
        <button className="w-full mt-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold">
          Sign in
        </button>
      </div>
    </div>
  );
}
