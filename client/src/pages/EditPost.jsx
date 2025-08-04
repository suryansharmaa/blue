import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "@/components/PostForm";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [initialValues, setInitialValues] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then((data) => {
        setInitialValues(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (updatedData) => {
    try {
      const res = await fetch(`${API_URL}/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Update failed");

      alert("Post updated!");
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error("Error updating post: ", error.message);
      alert("Error updating post.");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-blue-600">Loading post...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <PostForm
      formTitle="Edit Post"
      onSubmit={handleSubmit}
      initialValues={initialValues}
    />
  );
}
