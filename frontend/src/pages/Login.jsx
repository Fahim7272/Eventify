import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../App";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    const role = form.email.includes("admin") ? "admin" : "student";
    login({ id: 1, name: "User", email: form.email, role });

    navigate(from, { replace: true });
  };

  return (
    <div className="mt-20 mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-lg">
      <h1 className="text-2xl font-bold text-white">Login</h1>
      <p className="mt-1 text-sm text-slate-300">
        Welcome back! Please sign in.
      </p>

      {error && (
        <div className="mt-3 rounded-lg bg-red-500/15 text-red-300 ring-1 ring-red-500/30 px-3 py-2 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-200">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition"
            placeholder="••••••••"
          />
        </div>

        <button type="submit"className="w-full rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 ring-1 ring-white/10 transition">Login</button>

      </form>

      <p className="mt-6 text-center text-sm text-slate-300">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-blue-400 hover:text-blue-300 underline-offset-4 hover:underline"
        >
          Sign up
        </Link>

        
      </p>
    </div>

    
  );
}
