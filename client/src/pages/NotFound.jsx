import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white text-center px-4">
      <div className="bg-white/80 backdrop-blur-lg border border-blue-100 shadow-xl rounded-3xl p-10 max-w-md w-full animate-fadeIn">
        <h1 className="text-6xl font-extrabold text-blue-700 mb-4">404</h1>
        <p className="text-gray-700 text-lg mb-6">
          Oops! The page you're looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-200 font-medium shadow"
        >
          ⬅ Go Back Home
        </Link>
      </div>
    </div>
  );
}
