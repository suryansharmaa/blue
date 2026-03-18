import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { Heart, Edit3, Trash2, Clock, Send, User } from "lucide-react";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { user } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLikeCount(data.likes?.length || 0);
        setLiked(user ? data.likes?.includes(user.id) : false);
      })
      .catch(() => setPost(null))
      .finally(() => setLoading(false));

    fetch(`${API_URL}/api/comments/${id}`)
      .then((res) => res.json())
      .then((data) => setComments(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, [id, user]);

  const handleLike = async () => {
    if (!user) return navigate("/login");
    try {
      const res = await fetch(`${API_URL}/api/posts/${id}/like`, {
        method: "PUT",
        credentials: "include",
      });
      const data = await res.json();
      setLiked(data.liked);
      setLikeCount(data.likes?.length || likeCount + (data.liked ? 1 : -1));
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const res = await fetch(`${API_URL}/api/comments/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: commentText }),
      });
      const data = await res.json();
      if (res.ok) {
        setComments([data, ...comments]);
        setCommentText("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await fetch(`${API_URL}/api/comments/${commentId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setComments(comments.filter((c) => c._id !== commentId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`${API_URL}/api/posts/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#282a36] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#bd93f9] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#282a36] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#6272a4] text-lg mb-4">Post not found</p>
          <Link
            to="/"
            className="text-[#bd93f9] hover:text-[#ff79c6] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isAuthor =
    user && post.author && (post.author._id === user.id || post.author === user.id);

  const authorName =
    typeof post.author === "object" ? post.author.username : post.author;

  const authorId =
    typeof post.author === "object" ? post.author._id : null;

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-[#282a36] px-4 pt-8 pb-16">
      <div className="max-w-3xl mx-auto animate-fadeIn">
        <article className="bg-[#343746] border border-white/5 p-8 sm:p-10 rounded-2xl shadow-2xl mb-8">
          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-0.5 rounded-full bg-[#bd93f9]/10 text-[#bd93f9] font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold text-[#f8f8f2] mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 mb-8 text-sm text-[#6272a4]">
            <Link
              to={authorId ? `/profile/${authorId}` : "#"}
              className="flex items-center gap-2 hover:text-[#bd93f9] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#bd93f9] to-[#ff79c6] flex items-center justify-center text-xs font-bold text-[#282a36]">
                {authorName?.[0]?.toUpperCase() || "?"}
              </div>
              <span className="font-medium text-[#f8f8f2]/80">
                {authorName}
              </span>
            </Link>
            {formattedDate && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock size={13} />
                  {formattedDate}
                </span>
              </>
            )}
          </div>

          {post.image && (
            <img
              src={post.image}
              alt="Post"
              className="w-full h-72 object-cover rounded-xl mb-8 border border-white/5"
            />
          )}

          <div className="text-[#f8f8f2]/85 text-base sm:text-lg leading-relaxed whitespace-pre-line tracking-wide">
            {post.content}
          </div>

          {/* Actions bar */}
          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-xl transition-all duration-300 ${
                  liked
                    ? "text-[#ff79c6] bg-[#ff79c6]/10"
                    : "text-[#6272a4] hover:text-[#ff79c6] hover:bg-[#ff79c6]/5"
                }`}
              >
                <Heart size={16} fill={liked ? "#ff79c6" : "none"} />
                {likeCount}
              </button>
            </div>

            {isAuthor && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/edit/${id}`)}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#8be9fd] px-3 py-1.5 rounded-xl hover:bg-[#8be9fd]/10 transition-all duration-300"
                >
                  <Edit3 size={15} /> Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#ff5555] px-3 py-1.5 rounded-xl hover:bg-[#ff5555]/10 transition-all duration-300"
                >
                  <Trash2 size={15} /> Delete
                </button>
              </div>
            )}
          </div>
        </article>

        {/* Comments Section */}
        <div className="bg-[#343746] border border-white/5 rounded-2xl p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-[#f8f8f2] mb-6">
            Comments ({comments.length})
          </h3>

          {user ? (
            <form onSubmit={handleComment} className="flex gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8be9fd] to-[#bd93f9] flex items-center justify-center text-xs font-bold text-[#282a36] flex-shrink-0 mt-1">
                {user.username?.[0]?.toUpperCase()}
              </div>
              <div className="flex-1">
                <textarea
                  className="w-full px-4 py-2.5 bg-[#282a36] border border-white/10 rounded-xl text-[#f8f8f2] resize-none focus:outline-none focus:border-[#8be9fd]/50 focus:shadow-glow-cyan transition-all duration-300 placeholder-[#6272a4] text-sm h-20"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="mt-2 flex items-center gap-1.5 text-sm font-medium text-[#282a36] bg-gradient-to-r from-[#8be9fd] to-[#bd93f9] px-4 py-2 rounded-xl hover:shadow-glow-cyan transition-all duration-300 disabled:opacity-40"
                >
                  <Send size={14} /> Post Comment
                </button>
              </div>
            </form>
          ) : (
            <p className="text-sm text-[#6272a4] mb-6">
              <Link to="/login" className="text-[#bd93f9] hover:underline">
                Sign in
              </Link>{" "}
              to leave a comment.
            </p>
          )}

          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-[#6272a4] text-sm text-center py-4">
                No comments yet. Be the first!
              </p>
            ) : (
              comments.map((c) => (
                <div
                  key={c._id}
                  className="flex gap-3 p-4 bg-[#282a36] rounded-xl border border-white/5"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#bd93f9] to-[#ff79c6] flex items-center justify-center text-[10px] font-bold text-[#282a36] flex-shrink-0">
                    {c.author?.username?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-[#f8f8f2]/80">
                        {c.author?.username || "Unknown"}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#6272a4]">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </span>
                        {user &&
                          (c.author?._id === user.id ||
                            user.role === "admin") && (
                            <button
                              onClick={() => handleDeleteComment(c._id)}
                              className="text-[#6272a4] hover:text-[#ff5555] transition-colors"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                      </div>
                    </div>
                    <p className="text-sm text-[#f8f8f2]/70 leading-relaxed">
                      {c.content}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
