import React from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Clock } from "lucide-react";

export default function Postcard({ id, title, author, summary, date, tags, likes, commentCount }) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <Link
      to={`/posts/${id}`}
      className="block group"
    >
      <div className="bg-[#343746] border border-white/5 rounded-2xl px-6 py-6 mb-4 transition-all duration-300 hover:border-[#bd93f9]/30 hover:shadow-glow-purple hover:translate-y-[-2px]">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-0.5 rounded-full bg-[#bd93f9]/10 text-[#bd93f9] font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-lg sm:text-xl font-semibold text-[#f8f8f2] mb-2 group-hover:text-[#bd93f9] transition-colors duration-300">
          {title}
        </h3>

        {summary && (
          <p className="text-sm text-[#f8f8f2]/60 leading-relaxed line-clamp-2 mb-4">
            {summary}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-[#6272a4]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#bd93f9] to-[#ff79c6] flex items-center justify-center text-[10px] font-bold text-[#282a36]">
              {author?.username?.[0]?.toUpperCase() || author?.[0]?.toUpperCase() || "?"}
            </div>
            <span className="font-medium text-[#f8f8f2]/70">
              {typeof author === "object" ? author.username : author}
            </span>
            {formattedDate && (
              <>
                <span className="text-[#6272a4]">•</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {formattedDate}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {likes !== undefined && (
              <span className="flex items-center gap-1">
                <Heart size={13} /> {likes}
              </span>
            )}
            {commentCount !== undefined && (
              <span className="flex items-center gap-1">
                <MessageCircle size={13} /> {commentCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
