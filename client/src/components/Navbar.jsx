import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "@/context/authContext";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-800">
          blue
        </Link>

        <div className="hidden md:flex gap-6 items-center text-sm font-medium text-gray-800">
          {!user && (
            <>
              <Link
                to="/login"
                className={isActive("/login") ? "text-blue-600 underline" : ""}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={
                  isActive("/register") ? "text-blue-600 underline" : ""
                }
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className="hidden md:flex gap-2">
          {user && (
            <>
              <Link
                to="/create"
                className="px-4 py-1.5 text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md text-sm font-semibold transition"
              >
                Create Post
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-blue-700 border border-blue-300 hover:bg-blue-50 rounded-xl text-sm font-medium transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        <button
          className="md:hidden text-blue-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-sm font-medium text-gray-800 bg-white/90 backdrop-blur">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className={isActive("/") ? "text-blue-600 underline" : ""}
          >
            Home
          </Link>
          {!user && (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className={isActive("/login") ? "text-blue-600 underline" : ""}
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className={
                  isActive("/register") ? "text-blue-600 underline" : ""
                }
              >
                Register
              </Link>
            </>
          )}
          {user && (
            <>
              <Link
                to="/create"
                onClick={() => setMenuOpen(false)}
                className="text-white bg-blue-600 hover:bg-blue-700 rounded-xl px-4 py-2 shadow text-center"
              >
                Create Post
              </Link>
              <button
                onClick={handleLogout}
                className="border border-blue-300 rounded-xl px-4 py-2 text-blue-700 hover:bg-blue-50"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
