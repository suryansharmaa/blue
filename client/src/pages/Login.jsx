import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { LogIn, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      login(data.user);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#282a36] px-4">
      <div className="w-full max-w-md animate-fadeIn">
        <form
          onSubmit={handleSubmit}
          className="bg-[#343746] border border-white/5 shadow-2xl rounded-2xl px-8 py-10 relative overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#bd93f9]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#ff79c6]/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#bd93f9] to-[#ff79c6] flex items-center justify-center shadow-glow-purple">
                <LogIn size={22} className="text-[#282a36]" />
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-[#f8f8f2] text-center mb-2">
              Welcome back
            </h2>
            <p className="text-[#6272a4] text-center text-sm mb-8">
              Sign in to continue writing
            </p>

            {error && (
              <div className="mb-4 px-4 py-2.5 rounded-xl bg-[#ff5555]/10 border border-[#ff5555]/20 text-[#ff5555] text-sm">
                {error}
              </div>
            )}

            <div className="mb-5">
              <label className="block mb-1.5 text-sm font-medium text-[#f8f8f2]/70">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2.5 bg-[#282a36] border border-white/10 rounded-xl text-[#f8f8f2] focus:outline-none focus:border-[#bd93f9]/50 focus:shadow-glow-purple transition-all duration-300 placeholder-[#6272a4]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block mb-1.5 text-sm font-medium text-[#f8f8f2]/70">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2.5 bg-[#282a36] border border-white/10 rounded-xl text-[#f8f8f2] focus:outline-none focus:border-[#bd93f9]/50 focus:shadow-glow-purple transition-all duration-300 placeholder-[#6272a4] pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6272a4] hover:text-[#8be9fd] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#bd93f9] to-[#ff79c6] text-[#282a36] py-3 rounded-xl font-semibold hover:shadow-glow-purple transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="text-sm text-center mt-6 text-[#6272a4]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#bd93f9] hover:text-[#ff79c6] font-medium transition-colors"
              >
                Create one
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
