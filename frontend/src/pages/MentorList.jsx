import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NavbarH from "../components/NavbarH";
import SlotBookingModal from "../components/SlotBookingModal";
const BASE =
  import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || "http://localhost:5000";

export default function MentorList() {
  const [mentors, setMentors] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${BASE}/api/mentors`);
        const data = await res.json();
        setMentors(data || []);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#e8ecfc] relative">
      <NavbarH />
      <div className="flex flex-col items-center justify-center py-12 px-2">
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
        {/* Main Content */}
        <motion.h2
          className="text-4xl font-bold text-purple-700 mb-8 drop-shadow animate-grow z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Mentors
        </motion.h2>
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 z-10">
          {mentors.map((m, idx) => (
            <motion.div
              key={m._id}
              className="bg-white/80 rounded-2xl shadow-xl border border-purple-100/40 p-6 flex flex-col items-center transition-all hover:scale-105 hover:shadow-2xl cursor-pointer backdrop-blur-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={m.photoUrl || "https://picsum.photos/80"}
                alt={m.name}
                className="w-20 h-20 rounded-full mb-3 border-4 border-purple-200 shadow"
              />
              <h4 className="text-xl font-semibold text-purple-700 mb-1">
                {m.name}
              </h4>
              <p className="text-gray-600 text-sm mb-2 text-center line-clamp-3">
                {m.bio}
              </p>
              <p className="text-xs text-purple-600 mb-1">
                <span className="font-semibold">Expertise:</span>{" "}
                {m.expertise?.join(", ")}
              </p>
              <p className="text-xs text-blue-600 mb-3">
                <span className="font-semibold">Fee:</span> ₹
                {(m.fee / 100).toFixed(0)}
              </p>
              <button
                onClick={() => setSelected(m)}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow hover:scale-105 transition-all"
              >
                View slots / Book
              </button>
            </motion.div>
          ))}
        </div>
        {/* Subtle Animated Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-10 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000" />
        {selected && (
          <SlotBookingModal
            mentor={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </div>
    </div>
  );
}
