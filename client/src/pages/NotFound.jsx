import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#282a36] text-center px-4">
      <div className="bg-[#343746] border border-white/5 shadow-2xl rounded-2xl p-10 max-w-md w-full animate-fadeIn relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#ff79c6]/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-[#bd93f9]/15 rounded-full blur-3xl" />

        <div className="relative z-10">
          <h1 className="text-7xl font-extrabold bg-gradient-to-r from-[#bd93f9] to-[#ff79c6] bg-clip-text text-transparent mb-4">
            404
          </h1>
          <p className="text-[#f8f8f2]/70 text-lg mb-6">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-[#bd93f9] to-[#ff79c6] text-[#282a36] px-6 py-2.5 rounded-xl hover:shadow-glow-purple transition-all duration-300 font-medium"
          >
            ← Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
