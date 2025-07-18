import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
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
    </nav>
  );
}
