import Postcard from "@/components/Postcard";
import React from "react";
import posts from "@/data/posts";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts available.</p>
      ) : (
        posts.map((post) => (
          <Postcard
            key={post.id}
            id={post.id}
            title={post.title}
            author={post.author}
            summary={post.summary}
            date={post.date}
          />
        ))
      )}
    </div>
  );
}
