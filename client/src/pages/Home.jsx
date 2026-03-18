import Postcard from "@/components/Postcard";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, TrendingUp, Sparkles } from "lucide-react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchParams] = useSearchParams();
  const API_URL = import.meta.env.VITE_API_URL;

  const query = searchParams.get("q") || "";

  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set("page", page);
    params.set("limit", "10");
    if (query) params.set("q", query);
    if (selectedCategory) params.set("category", selectedCategory);

    fetch(`${API_URL}/api/posts?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) => console.error("Error fetching posts:", err))
      .finally(() => setLoading(false));
  }, [page, query, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#282a36] px-4 pt-8 pb-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12 animate-fadeIn">
        <div className="inline-flex items-center gap-2 text-sm text-[#8be9fd] bg-[#8be9fd]/10 px-4 py-1.5 rounded-full mb-6">
          <Sparkles size={14} />
          <span>Discover fresh perspectives</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
          <span className="bg-gradient-to-r from-[#bd93f9] via-[#ff79c6] to-[#8be9fd] bg-clip-text text-transparent">
            Stories that
          </span>
          <br />
          <span className="text-[#f8f8f2]">inspire & connect</span>
        </h1>
        <p className="text-[#6272a4] text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
          A modern platform for writers and readers. Share your ideas, follow creators, and join the conversation.
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-3xl mx-auto mb-8 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedCategory("")}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-300 ${
            !selectedCategory
              ? "bg-[#bd93f9] text-[#282a36]"
              : "bg-[#343746] text-[#f8f8f2]/60 hover:text-[#f8f8f2] border border-white/5"
          }`}
        >
          All Posts
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => {
              setSelectedCategory(cat._id);
              setPage(1);
            }}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-300 ${
              selectedCategory === cat._id
                ? "bg-[#ff79c6] text-[#282a36]"
                : "bg-[#343746] text-[#f8f8f2]/60 hover:text-[#f8f8f2] border border-white/5"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {query && (
        <div className="max-w-3xl mx-auto mb-6">
          <p className="text-sm text-[#6272a4]">
            Search results for{" "}
            <span className="text-[#8be9fd] font-medium">"{query}"</span>
          </p>
        </div>
      )}

      {/* Posts */}
      <div className="max-w-3xl mx-auto">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-[#343746] border border-white/5 rounded-2xl p-6 animate-fadeIn"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-4 w-24 skeleton rounded mb-3" />
                <div className="h-6 w-3/4 skeleton rounded mb-3" />
                <div className="h-4 w-full skeleton rounded mb-2" />
                <div className="h-4 w-2/3 skeleton rounded" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <TrendingUp size={48} className="mx-auto text-[#6272a4] mb-4" />
            <p className="text-[#6272a4] text-lg">No posts found.</p>
            <p className="text-[#6272a4]/60 text-sm mt-1">
              Be the first to share something!
            </p>
          </div>
        ) : (
          <>
            {posts.map((post, i) => (
              <div
                key={post._id}
                className="animate-fadeIn"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <Postcard
                  id={post._id}
                  title={post.title}
                  author={post.author}
                  summary={post.summary}
                  date={post.createdAt}
                  tags={post.tags}
                  likes={post.likes?.length}
                />
              </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-300 ${
                        p === page
                          ? "bg-[#bd93f9] text-[#282a36]"
                          : "bg-[#343746] text-[#f8f8f2]/60 hover:text-[#f8f8f2] border border-white/5 hover:border-[#bd93f9]/30"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
