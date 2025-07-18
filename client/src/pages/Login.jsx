import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Email: ", email);
    console.log("Password: ", password);

    // Will send to backend later
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="block mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Login
        </button>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
