import React, { useState } from "react";

export default function PostForm({ initialValues = {}, onSubmit, formTitle }) {
  const [title, setTitle] = useState(() => initialValues.title || "");
  const [content, setContent] = useState(() => initialValues.content || "");
  const [author, setAuthor] = useState(() => initialValues.author || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      content,
      author,
      ...(initialValues.date && { date: initialValues.date }),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-2xl bg-white p-6 sm:p-10 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          {formTitle}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              className="w-full px-4 py-2 h-40 border border-gray-300 rounded-xl shadow-sm resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
