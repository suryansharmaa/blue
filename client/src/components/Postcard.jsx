import React from "react";

export default function Postcard({ title, author, summary, date }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 mb-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-3">
        <span className="font-medium">{author}</span> • <span>{date}</span>
      </p>
      <p className="text-gray-700 leading-relaxed">{summary}</p>
    </div>
  );
}
