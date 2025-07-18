import PostForm from "@/components/PostForm";
import React from "react";

export default function CreatePost() {
  const handleSubmit = (formData) => {
    e.preventDefault();

    console.log("New Post: ", formData);
    alert("Post uploaded (placeholder)");

    // TODO: send to backend later
  };

  return <PostForm formTitle="Create New Post" onsubmit={handleSubmit} />;
}
