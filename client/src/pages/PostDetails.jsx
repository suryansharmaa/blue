import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem("token");
  const currentUser = localStorage.getItem("user");

  useEffect(() => {
    fetch(`${API_URL}/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("Error fetching post: ", err));
  }, [id]);

  if (!post)
    return (
      <div className="text-center text-red-500 mt-20 text-lg font-medium">
        Post not found
      </div>
    );

  const isAuthor = post.author === currentUser;

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Post deleted successfully");
        navigate("/");
      } else {
        const errorData = await res.json();
        alert(`Delete failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-blue-100">
        <h1 className="text-4xl font-bold mb-3 text-blue-800">{post.title}</h1>
        <p className="text-gray-500 text-sm mb-6">
          By <span className="font-medium text-gray-700">{post.author}</span> •{" "}
          {post.date}
        </p>

        {post.image && (
          <img
            src={post.image}
            alt="Post"
            className="w-full h-72 object-cover rounded-xl mb-8 shadow"
          />
        )}

        <p className="text-lg leading-relaxed whitespace-pre-line text-gray-800 tracking-wide">
          {post.content}
        </p>

        {isAuthor && (
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => navigate(`/edit/${id}`)}
              className="px-6 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition shadow-md font-medium"
            >
              Edit Post
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-2 rounded-xl text-red-600 border border-red-400 hover:bg-red-50 transition shadow-sm font-medium"
            >
              Delete Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
