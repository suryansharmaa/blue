import posts from "@/data/posts";
import React from "react";
import { useParams } from "react-router-dom";

export default function PostDetails() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) return <p className="text-center text-red-500">Page not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-6">
        By {post.author} • {post.date}
      </p>
      <p className="text-lg leading-relaxed text-gray-800">{post.content}</p>
    </div>
  );
}
