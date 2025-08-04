import React from "react";
import { Link } from "react-router-dom";

export default function Postcard({ id, title, author, summary, date }) {
  return (
    <Link
      to={`/posts/${id}`}
      className="block transition-transform hover:scale-[1.02]"
    >
      <div className="bg-gradient-to-br from-white/60 to-blue-50/40 backdrop-blur-md border border-blue-100 shadow-md hover:shadow-xl rounded-2xl px-5 py-6 mb-6 transition-all duration-200 sm:px-6 sm:py-7 md:px-8 md:py-8">
        <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-2">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-blue-700 mb-3">
          <span className="font-medium">{author}</span>
          {date && <span className="mx-1 sm:mx-2 text-blue-500">•</span>}
          <span>{date}</span>
        </p>

        {summary && (
          <p className="text-sm sm:text-base text-blue-800/90 leading-relaxed tracking-wide line-clamp-3">
            {summary}
          </p>
        )}
      </div>
    </Link>
  );
}
