import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../App";

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    // Mock signup → directly logs user in
    login({
      id: Date.now(),
      name: form.name,
      email: form.email,
      role: form.role,
    });

    navigate(form.role === "admin" ? "/admin" : "/student");
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-lg">
      <h1 className="text-2xl font-bold text-white">Create an Account</h1>
      <p className="mt-1 text-sm text-slate-300">Join Eventify today!</p>

      {error && (
        <div className="mt-3 rounded-lg bg-red-500/15 text-red-300 ring-1 ring-red-500/30 px-3 py-2 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-200">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200">Email</label>
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
          <label className="block text-sm font-medium text-slate-200">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition"
          >
            <option className="bg-neutral-900" value="student">Student</option>
            <option className="bg-neutral-900" value="admin">Club Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 ring-1 ring-white/10 transition"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-300">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-blue-400 hover:text-blue-300 underline-offset-4 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
