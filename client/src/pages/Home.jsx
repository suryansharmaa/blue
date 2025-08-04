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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 pt-12 pb-12">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 tracking-tight leading-snug">
          Discover Inspiring Blog Posts
        </h2>
        <p className="mt-4 text-gray-600 text-lg md:text-xl leading-relaxed">
          Fresh perspectives from around the world. Ideas, experiences, and
          stories — all in one place.
        </p>
      </div>

      <div className="mt-12 md:mt-16 max-w-3xl mx-auto space-y-8 transition-opacity duration-500 ease-in">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center">No posts available.</p>
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
    </div>
  );
}
