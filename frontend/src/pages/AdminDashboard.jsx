import React, { useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import { useAuth } from "../App";

const dummyEvents = [
  {
    id: 1,
    title: "Tech Fest 2025",
    date: "2025-09-15",
    location: "Auditorium A",
    category: "Technology",
    image: "https://source.unsplash.com/600x400/?technology,conference",
    participants: 42,
  },
  {
    id: 2,
    title: "Startup Pitch",
    date: "2025-09-22",
    location: "Innovation Hub",
    category: "Business",
    image: "https://source.unsplash.com/600x400/?startup,pitch",
    participants: 30,
  },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [events, setEvents] = useState(dummyEvents);

  const handleDelete = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome, {user?.name || "Admin"} 👋
          </h1>
          <p className="text-slate-600">Manage your events and view stats here.</p>
        </div>
        <Link
          to="/admin/create"
          className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          + Create Event
        </Link>
      </div>

      {/* Stats */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Total Events</h2>
          <p className="mt-2 text-3xl font-bold text-blue-600">{events.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Participants</h2>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {events.reduce((sum, e) => sum + e.participants, 0)}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Admins</h2>
          <p className="mt-2 text-3xl font-bold text-purple-600">1</p>
        </div>
      </section>

      {/* Manage Events */}
      <section>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Your Events</h2>
        {events.length === 0 ? (
          <p className="text-slate-600 text-sm">No events created yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                action={
                  <div className="flex gap-2 mt-3">
                    <Link
                      to={`/admin/edit/${event.id}`}
                      className="flex-1 rounded-full border border-blue-500 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 transition text-center"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="flex-1 rounded-full border border-red-500 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </div>
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
