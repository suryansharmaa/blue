import PostForm from "@/components/PostForm";
import React from "react";

export default function CreatePost() {
  const handleSubmit = (formData) => {
    const data = {
      ...formData,
      author: "Bob",
      date: new Date().toISOString(),
    };

    console.log("New Post: ", data);
    alert("Post uploaded");

    // TODO: send to backend later
  };

  return <PostForm formTitle="Create New Post" onSubmit={handleSubmit} />;
}
