import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("Error fetching post: ", err));
  }, [id]);

  if (!post) return <p className="text-center text-red-500">Page not found</p>;

  const currentUser = "Bob"; //dummy logged in user
  const isAuthor = post.author === currentUser;

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/api/posts/${id}`, {
        method: "DELETE",
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
    <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-4">
        By {post.author} • {post.date}
      </p>

      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="w-full h-72 object-cover rounded mb-6"
        />
      )}
      <p className="text-lg leading-relaxed whitespace-pre-line text-gray-700">
        {post.content}
      </p>

      {isAuthor && (
        <div className="mt-8 flex space-x-4">
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="px-4 py2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
