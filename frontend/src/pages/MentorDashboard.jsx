import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
const BASE =
  import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || "http://localhost:5000";

export default function MentorDashboard() {
  const [mentor, setMentor] = useState(null);
  const [slot, setSlot] = useState({ start: "", end: "" });
  const [slots, setSlots] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem("mentor_token");
        const res = await fetch(`${BASE}/api/mentors/auth/me`, {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Not auth");
        setMentor(data);
        fetchSlots(data._id);
      } catch (err) {
        setMsg(err.message);
      }
    }
    load();
  }, []);

  const fetchSlots = async (mentorId) => {
    try {
      const res = await fetch(
        `${BASE}/api/slots/mentor/${mentorId}?includePast=true`
      );
      const data = await res.json();
      setSlots(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const createSlot = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("mentor_token");
      const payload = {
        mentorId: mentor._id,
        start: new Date(slot.start).toISOString(),
        end: new Date(slot.end).toISOString(),
      };
      const res = await fetch(`${BASE}/api/slots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Slot create failed");
      setMsg("Slot created");
      fetchSlots(mentor._id);
      setSlot({ start: "", end: "" });
    } catch (err) {
      setMsg(err.message);
    }
  };

  if (!mentor)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-purple-600">
        Loading mentor profile... {msg && <span>{msg}</span>}
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#e8ecfc] relative py-12 px-2">
      {/* Animated Stickers */}
      <motion.div
        className="hidden lg:block absolute top-8 left-8 z-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 80 80"
          fill="none"
          className="w-16 h-16 text-purple-400"
        >
          <circle
            cx="40"
            cy="40"
            r="32"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <circle
            cx="40"
            cy="40"
            r="24"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.4"
          />
          <circle
            cx="40"
            cy="40"
            r="16"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.3"
          />
          <circle cx="40" cy="40" r="4" fill="currentColor" opacity="0.8" />
        </svg>
      </motion.div>
      <motion.div
        className="hidden lg:block absolute bottom-12 right-8 z-0"
        animate={{ rotate: -360, scale: [1, 1.15, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 80 80"
          fill="none"
          className="w-16 h-16 text-blue-400"
        >
          <rect
            x="32"
            y="35"
            width="16"
            height="18"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <circle cx="40" cy="50" r="1.5" fill="currentColor" opacity="0.6" />
        </svg>
      </motion.div>
      {/* Main Card */}
      <motion.div
        className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-xl p-8 z-10 border border-purple-100/40 backdrop-blur-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold text-purple-700 mb-2 drop-shadow animate-grow">
          Welcome, {mentor.name}
        </h2>
        <p className="text-gray-700 mb-4">{mentor.bio}</p>
        <h3 className="text-xl font-semibold text-purple-700 mb-2">
          Create Slot
        </h3>
        <form onSubmit={createSlot} className="mb-6 space-y-3">
          <div>
            <label className="block text-sm font-medium text-purple-600 mb-1">
              Start (local):
            </label>
            <input
              type="datetime-local"
              value={slot.start}
              onChange={(e) => setSlot({ ...slot, start: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-600 mb-1">
              End (local):
            </label>
            <input
              type="datetime-local"
              value={slot.end}
              onChange={(e) => setSlot({ ...slot, end: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow hover:scale-105 transition-all"
          >
            Create Slot
          </button>
        </form>
        {msg && (
          <p className="mb-4 text-purple-700 animate-bounce font-medium">
            {msg}
          </p>
        )}
        <h3 className="text-xl font-semibold text-purple-700 mb-2">
          Your Slots
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-purple-200 rounded-lg shadow text-sm">
            <thead className="bg-purple-50">
              <tr>
                <th className="px-4 py-2 text-left">Start</th>
                <th className="px-4 py-2 text-left">End</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((s) => (
                <tr key={s._id} className="even:bg-purple-50">
                  <td className="px-4 py-2">
                    {dayjs(s.start).format("YYYY-MM-DD HH:mm")}
                  </td>
                  <td className="px-4 py-2">
                    {dayjs(s.end).format("YYYY-MM-DD HH:mm")}
                  </td>
                  <td className="px-4 py-2">{s.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      {/* Subtle Animated Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-10 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000" />
    </div>
  );
}
