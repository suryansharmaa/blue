import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function PostForm({ initialValues = {}, onSubmit, formTitle }) {
  const [title, setTitle] = useState(() => initialValues.title || "");
  const [content, setContent] = useState(() => initialValues.content || "");
  const [summary, setSummary] = useState(() => initialValues.summary || "");
  const [category, setCategory] = useState(() => initialValues.category?._id || initialValues.category || "");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(() => initialValues.tags || []);
  const [categories, setCategories] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const tag = tagInput.trim().toLowerCase();
      if (!tags.includes(tag)) {
        setTags([...tags, tag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      content,
      summary,
      category: category || undefined,
      tags,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#282a36] px-4 pt-20 pb-12">
      <div className="w-full max-w-2xl bg-[#343746] border border-white/5 p-8 sm:p-10 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#bd93f9] to-[#ff79c6] bg-clip-text text-transparent mb-8 text-center">
          {formTitle}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[#f8f8f2]/70 mb-1.5">
              Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-[#282a36] border border-white/10 rounded-xl text-[#f8f8f2] focus:outline-none focus:border-[#bd93f9]/50 focus:shadow-glow-purple transition-all duration-300 placeholder-[#6272a4]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              required
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium text-[#f8f8f2]/70 mb-1.5">
              Summary
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-[#282a36] border border-white/10 rounded-xl text-[#f8f8f2] focus:outline-none focus:border-[#bd93f9]/50 focus:shadow-glow-purple transition-all duration-300 placeholder-[#6272a4]"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief summary (optional)..."
              maxLength={300}
            />
          </div>

          {/* Content (Markdown) */}
          <div>
            <label className="block text-sm font-medium text-[#f8f8f2]/70 mb-1.5">
              Content <span className="text-[#6272a4]">(Markdown supported)</span>
            </label>
            <textarea
              className="w-full px-4 py-3 h-48 bg-[#282a36] border border-white/10 rounded-xl text-[#f8f8f2] resize-none focus:outline-none focus:border-[#bd93f9]/50 focus:shadow-glow-purple transition-all duration-300 placeholder-[#6272a4] font-mono text-sm"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post in Markdown..."
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-[#f8f8f2]/70 mb-1.5">
              Category
            </label>
            <select
              className="w-full px-4 py-2.5 bg-[#282a36] border border-white/10 rounded-xl text-[#f8f8f2] focus:outline-none focus:border-[#bd93f9]/50 focus:shadow-glow-purple transition-all duration-300"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category (optional)</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-[#f8f8f2]/70 mb-1.5">
              Tags <span className="text-[#6272a4]">(press Enter to add)</span>
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-[#bd93f9]/15 text-[#bd93f9] font-medium"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-[#ff5555] transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-[#282a36] border border-white/10 rounded-xl text-[#f8f8f2] focus:outline-none focus:border-[#8be9fd]/50 focus:shadow-glow-cyan transition-all duration-300 placeholder-[#6272a4]"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Type a tag and press Enter..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#bd93f9] to-[#ff79c6] text-[#282a36] py-3 rounded-xl font-semibold hover:shadow-glow-purple transition-all duration-300 text-sm"
          >
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
}
