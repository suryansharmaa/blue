import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      login(data.user);
      alert("Logged in successfully!");
      console.log("User: ", data);
      navigate("/");
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/60 backdrop-blur-md border border-blue-200 shadow-xl rounded-2xl w-full max-w-md px-8 py-10"
      >
        <h2 className="text-3xl font-extrabold text-blue-900 text-center mb-6">
          Sign In
        </h2>

        <div className="mb-5">
          <label className="block mb-1 text-sm font-medium text-blue-800">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-blue-800">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4 text-gray-700">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-700 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
