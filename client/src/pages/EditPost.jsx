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
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Update failed");

      navigate(`/posts/${id}`);
    } catch (error) {
      console.error("Error updating post:", error.message);
      alert("Error updating post.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#282a36]">
        <div className="w-8 h-8 border-2 border-[#bd93f9] border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#282a36]">
        <p className="text-[#ff5555]">Error: {error}</p>
      </div>
    );

  return (
    <PostForm
      formTitle="Edit Post"
      onSubmit={handleSubmit}
      initialValues={initialValues}
    />
  );
}
