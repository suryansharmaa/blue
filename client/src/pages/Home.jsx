import Postcard from "@/components/Postcard";
import React from "react";

const posts = [
  {
    id: 1,
    title: "How to build a blog with React?",
    author: "John Doe",
    summary:
      "Learn how to build a modern blog application using React, component based structure and routing",
    date: "July 17, 2025",
  },
  {
    id: 2,
    title: "Understanding Javascript Closures",
    author: "Alex",
    summary:
      "Closures are a powerful concept in JS. Here is a simple explanation",
    date: "July 14, 2025",
  },
  {
    id: 3,
    title: "Getting started with Node.js",
    author: "Steph",
    summary:
      "Node.js lets you run Javascript on the server. Let's explore how it works",
    date: "July 10, 2025",
  },
];

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Latest Blog Posts</h2>
      <p className="text-gray-600 mb-6">
        Stay up to date with our newest articles on web development.
      </p>

      {posts.map((post) => (
        <Postcard
          key={post.id}
          title={post.title}
          author={post.author}
          summary={post.summary}
          date={post.date}
        />
      ))}
    </div>
  );
}
