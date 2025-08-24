import React, { useState } from "react";
import EventCard from "../components/EventCard";
import { useAuth } from "../App";

const allEvents = [
  {
    id: 1,
    title: "Tech Fest 2025",
    date: "2025-09-15",
    location: "Auditorium A",
    category: "Technology",
    image: "https://source.unsplash.com/600x400/?technology,conference",
  },
  {
    id: 2,
    title: "Music Night",
    date: "2025-09-20",
    location: "Open Ground",
    category: "Music",
    image: "https://source.unsplash.com/600x400/?music,concert",
  },
  {
    id: 3,
    title: "Robotics Workshop",
    date: "2025-09-25",
    location: "Lab 101",
    category: "Workshop",
    image: "https://source.unsplash.com/600x400/?robotics,workshop",
  },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const [registered, setRegistered] = useState([]);

  const handleRegister = (event) => {
    if (!registered.some((e) => e.id === event.id)) {
      setRegistered([...registered, event]);
    }
  };

  const handleUnregister = (eventId) => {
    setRegistered(registered.filter((e) => e.id !== eventId));
  };

  return (
    <div className="grid gap-8 md:grid-cols-4">
      {/* Sidebar */}
      <aside className="md:col-span-1 space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Hello, {user?.name || "Student"} 👋</h2>
          <p className="mt-1 text-sm text-slate-600">Role: {user?.role}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Quick Stats</h3>
          <p className="mt-2 text-sm text-slate-600">Registered: {registered.length}</p>
          <p className="text-sm text-slate-600">Available: {allEvents.length}</p>
        </div>
      </aside>

      {/* Content */}
      <section className="md:col-span-3 space-y-10">
        {/* My Events */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">My Registered Events</h2>
          {registered.length === 0 ? (
            <p className="text-slate-600 text-sm">You haven’t registered for any events yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {registered.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  action={
                    <button
                      onClick={() => handleUnregister(event.id)}
                      className="mt-3 w-full rounded-full border border-red-400 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition"
                    >
                      Unregister
                    </button>
                  }
                />
              ))}
            </div>
          )}
        </div>

        {/* All Events */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">All Events</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                action={
                  registered.some((e) => e.id === event.id) ? (
                    <button
                      onClick={() => handleUnregister(event.id)}
                      className="mt-3 w-full rounded-full border border-red-400 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition"
                    >
                      Unregister
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRegister(event)}
                      className="mt-3 w-full rounded-full bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                    >
                      Register
                    </button>
                  )
                }
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
