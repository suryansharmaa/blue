import PostForm from "@/components/PostForm";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setInitialValues(data))
      .catch((err) => console.error("Error fetching post: ", err));
  }, [id]);

  const handleSubmit = async (updatedData) => {
    try {
      const res = await fetch(`${API_URL}/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();
      console.log("Updated post: ", result);

      navigate(`/posts/${id}`);
    } catch (error) {
      console.error("Error updating post: ", error);
    }
  };

  if (!initialValues)
    return <p className="text-center mt-10 text-red-500">Post Not Found</p>;

  return (
    <PostForm
      formTitle="Edit Post"
      onSubmit={handleSubmit}
      initialValues={initialValues}
      isEditing={true}
    />
  );
}
