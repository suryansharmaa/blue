import Postcard from "@/components/Postcard";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts: ", err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts available.</p>
      ) : (
        posts.map((post) => (
          <Postcard
            key={post._id}
            id={post._id}
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
