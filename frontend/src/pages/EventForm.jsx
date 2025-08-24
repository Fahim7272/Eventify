import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EventForm({ mode }) {
  const navigate = useNavigate();
  const { id } = useParams(); // for edit
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    category: "General",
    image: "",
    description: "",
  });
  const [error, setError] = useState("");

  // 🔹 Load event data if editing (mock for now)
  useEffect(() => {
    if (mode === "edit" && id) {
      // Pretend fetch event by ID
      const mockEvent = {
        id,
        title: "Tech Fest 2025",
        date: "2025-09-15",
        location: "Auditorium A",
        category: "Technology",
        image: "https://source.unsplash.com/600x400/?technology,conference",
        description: "An exciting festival of technology and innovation!",
      };
      setForm(mockEvent);
    }
  }, [mode, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.date || !form.location) {
      setError("Please fill in all required fields.");
      return;
    }

    if (mode === "create") {
      console.log("✅ Creating new event:", form);
    } else {
      console.log("✏️ Updating event:", form);
    }

    navigate("/admin"); // redirect after save
  };

  return (
    <div className="mx-auto w-screen max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">
        {mode === "create" ? "Create New Event" : "Edit Event"}
      </h1>
      <p className="mt-1 text-slate-600 text-sm">
        {mode === "create"
          ? "Fill in the details to create a new event."
          : "Update your event details below."}
      </p>

      {error && (
        <div className="mt-3 rounded-lg bg-red-100 text-red-700 px-3 py-2 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Event title"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g. Auditorium A"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option>General</option>
            <option>Technology</option>
            <option>Workshop</option>
            <option>Business</option>
            <option>Music</option>
            <option>Sports</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Describe your event..."
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          {mode === "create" ? "Create Event" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
