import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        alert("Logged out successfully");
      } else {
        const data = await res.json();
        alert(data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error: ", error.message);
    }
  };
  return (
    <nav className="p-4 bg-gray-100">
      <Link to="/" className="mr-4">
        Home
      </Link>
      <Link to="/login" className="mr-4">
        Login
      </Link>
      <Link to="/register" className="mr-4">
        Register
      </Link>
      <Link
        to="/create"
        className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Create Post
      </Link>
      <button
        onClick={handleLogout}
        className="ml-4 text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </nav>
  );
}
