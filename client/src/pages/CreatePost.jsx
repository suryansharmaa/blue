import React from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "@/components/PostForm";

export default function CreatePost() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/api/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to create post");

      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error.message);
      alert("Something went wrong. Please try again.");
    }
  };

  return <PostForm formTitle="Create New Post" onSubmit={handleSubmit} />;
}
