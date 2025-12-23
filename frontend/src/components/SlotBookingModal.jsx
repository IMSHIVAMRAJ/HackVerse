import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import loadRazorpay from "../helpers/loadRazorpay";
const BASE =
  import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || "http://localhost:5000";

export default function SlotBookingModal({ mentor, onClose }) {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${BASE}/api/slots/mentor/${mentor._id}`);
        const data = await res.json();
        setSlots(data || []);
      } catch (err) {
        console.error(err);
        setMsg("Failed to load slots");
      }
    }
    load();
  }, [mentor]);

  const startPayment = async () => {
    try {
      if (!selectedSlot) {
        setMsg("Select a slot first");
        return;
      }
      const userId = localStorage.getItem("user_id") || "guest_user";

      const token = localStorage.getItem("mentor_token"); // not required for user, but if backend checks auth, adapt accordingly

      const payload = {
        userId,
        mentorId: mentor._id,
        slotId: selectedSlot._id,
      };
      const res = await fetch(`${BASE}/api/payments/razorpay/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Create order failed");

      const ok = await loadRazorpay();
      if (!ok) {
        setMsg("Razorpay SDK failed to load");
        return;
      }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "HackVerse Mentorship",
        description: `Session with ${mentor.name}`,
        order_id: data.orderId,
        handler: function (response) {
          setMsg("Payment initiated. Server will confirm via webhook.");
          console.log("razorpay success", response);
        },
        prefill: {
          name: localStorage.getItem("user_name") || "",
          email: localStorage.getItem("user_email") || "",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setMsg(err.message || "Payment init failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
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
      {/* Modal Card */}
      <motion.div
        className="relative w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 z-10 border border-purple-100/40 backdrop-blur-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 text-lg font-bold"
        >
          ×
        </button>
        <h3 className="text-2xl font-bold text-purple-700 mb-2">
          Book {mentor.name}
        </h3>
        <p className="mb-2 text-blue-600 font-semibold">
          Fee: ₹{(mentor.fee / 100).toFixed(0)}
        </p>
        <h4 className="text-lg font-semibold text-purple-700 mb-2">
          Available Slots
        </h4>
        {slots.length === 0 && (
          <p className="text-gray-500">No upcoming slots.</p>
        )}
        <ul className="mb-4 space-y-2">
          {slots.map((s) => (
            <li key={s._id}>
              <label
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${
                  selectedSlot?._id === s._id
                    ? "bg-purple-100 border border-purple-400"
                    : "hover:bg-purple-50"
                }`}
              >
                <input
                  type="radio"
                  name="slot"
                  onChange={() => setSelectedSlot(s)}
                  checked={selectedSlot?._id === s._id}
                  className="accent-purple-600"
                />
                <span className="text-sm text-gray-700">
                  {new Date(s.start).toLocaleString()} -{" "}
                  {new Date(s.end).toLocaleString()}{" "}
                  <span className="ml-2 text-xs text-gray-400">
                    ({s.status})
                  </span>
                </span>
              </label>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <button
            onClick={startPayment}
            disabled={!selectedSlot}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow hover:scale-105 transition-all disabled:opacity-60"
          >
            Pay & Book
          </button>
        </div>
        {msg && (
          <p className="mt-4 text-purple-700 animate-bounce font-medium">
            {msg}
          </p>
        )}
      </motion.div>
      {/* Subtle Animated Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-10 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000" />
    </div>
  );
}
