import PostForm from "@/components/PostForm";
import React from "react";

export default function CreatePost() {
  const handleSubmit = async (formData) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log("Created post: ", result);
    } catch (error) {
      console.error("Error creating post: ", error);
    }
  };
  return <PostForm formTitle="Create New Post" onSubmit={handleSubmit} />;
}
