import PostForm from "@/components/PostForm";
import posts from "@/data/posts";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const foundPost = posts.find((p) => p.id === parseInt(id));
    if (foundPost) {
      setPostData(foundPost);
    } else {
      setPostData(null);
    }
  }, [id]);

  const handleSubmit = (updatedData) => {
    console.log("Updated Post Data: ", updatedData);
    alert("Post updated!");

    // Send to backend later
  };

  if (!postData)
    return <p className="text-center mt-10 text-red-500">Post Not Found</p>;

  console.log("Sending to form:", postData);

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Post</h2>
      <PostForm
        onSubmit={handleSubmit}
        initialValues={postData}
        isEditing={true}
      />
    </div>
  );
}
