import React, { useEffect, useState } from "react";

export default function PostForm({ initialValues = {}, onSubmit, formTitle }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");

  console.log("Initial values received in PostForm:", initialValues);

  useEffect(() => {
    setTitle(initialValues.title || "");
    setContent(initialValues.content || "");
    setAuthor(initialValues.author || "");
    setDate(initialValues.date || "");
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, author, date });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{formTitle}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Content</label>
          <textarea
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Author</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
