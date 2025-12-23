import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import loadRazorpay from "../helpers/loadRazorpay";

const BASE =
  import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || "http://localhost:5000";

export default function UserBookingPage() {
  const { mentorId } = useParams();
  const [mentor, setMentor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // get mentor detail
        const r1 = await fetch(`${BASE}/api/mentors/${mentorId}`);
        const mentorData = await r1.json();
        if (!r1.ok)
          throw new Error(mentorData.message || "Failed to load mentor");

        // get upcoming slots (default excludes past)
        const r2 = await fetch(`${BASE}/api/slots/mentor/${mentorId}`);
        const slotsData = await r2.json();
        if (!r2.ok)
          throw new Error(slotsData.message || "Failed to load slots");

        setMentor(mentorData);
        setSlots(slotsData || []);
      } catch (err) {
        console.error(err);
        setMsg(err.message || "Error loading");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [mentorId]);

  // helper: get userId (either from your user auth or use guest fallback)
  const getUserId = () => {
    return localStorage.getItem("user_id") || "guest_user";
  };

  const startPayment = async () => {
    try {
      setMsg("");
      if (!selectedSlot) {
        setMsg("Pehele slot select karo");
        return;
      }

      // create order on backend
      const payload = {
        userId: getUserId(),
        mentorId: mentor._id,
        slotId: selectedSlot._id,
      };

      // If your backend requires an Authorization header for users, add here:
      // const userToken = localStorage.getItem('user_token');

      const res = await fetch(`${BASE}/api/payments/razorpay/create-order`, {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json" /*, 'Authorization': userToken ? `Bearer ${userToken}` : '' */,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Order create failed");

      // load Razorpay
      const ok = await loadRazorpay();
      if (!ok) throw new Error("Razorpay SDK failed to load");

      // Prepare options
      const options = {
        key: data.keyId, // from server
        amount: data.amount,
        currency: data.currency,
        name: "HackVerse Mentorship",
        description: `Session with ${mentor.name}`,
        order_id: data.orderId,
        handler: function (response) {
          // NOTE: real confirmation via webhook on server.
          setMsg(
            "Payment success (client). Server will confirm via webhook shortly."
          );
          // You can optionally poll booking status or call an endpoint to get booking details by bookingId
          console.log("razorpay response", response);
        },
        modal: {
          // optional: prevent close on overlay
          escape: true,
        },
        prefill: {
          name: localStorage.getItem("user_name") || "",
          email: localStorage.getItem("user_email") || "",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (resp) {
        console.warn("payment failed", resp);
        setMsg("Payment failed: " + (resp.error?.description || "Unknown"));
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      setMsg(err.message || "Payment init failed");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-purple-600">
        Loading...
      </div>
    );
  if (!mentor)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-lg text-red-600">
        Mentor not found.{" "}
        <Link to="/mentors" className="text-blue-600 underline ml-2">
          Back to mentors
        </Link>
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
        className="w-full max-w-3xl bg-white/80 rounded-2xl shadow-xl p-8 z-10 backdrop-blur-md border border-purple-100/40"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Link
          to="/mentors"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Back to mentors
        </Link>
        <h2 className="text-3xl font-bold text-purple-700 mb-2 drop-shadow animate-grow">
          Book session with {mentor.name}
        </h2>
        <p className="text-gray-700 mb-2">{mentor.bio}</p>
        <p className="mb-1">
          <span className="font-semibold text-purple-600">Expertise:</span>{" "}
          {mentor.expertise?.join(", ")}
        </p>
        <p className="mb-4">
          <span className="font-semibold text-purple-600">Fee:</span> ₹
          {(mentor.fee / 100).toFixed(0)}
        </p>
        <h3 className="text-xl font-semibold text-purple-700 mb-2">
          Available Slots
        </h3>
        {slots.length === 0 && (
          <p className="text-gray-500">No upcoming slots. Try later.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {slots.map((s) => (
            <motion.div
              key={s._id}
              className={`rounded-xl p-4 cursor-pointer border transition-all duration-200 shadow-sm ${
                selectedSlot?._id === s._id
                  ? "border-purple-500 bg-purple-50/60"
                  : "border-gray-200 bg-white/70"
              } ${s.status !== "available" ? "opacity-60" : ""}`}
              whileHover={{ scale: s.status === "available" ? 1.03 : 1 }}
              onClick={() => s.status === "available" && setSelectedSlot(s)}
            >
              <div className="font-semibold text-purple-700">
                {new Date(s.start).toLocaleString()}
              </div>
              <div className="text-gray-500 text-sm">
                {new Date(s.end).toLocaleString()}
              </div>
              <div className="mt-2">
                Status: <span className="font-bold">{s.status}</span>
              </div>
              {s.status !== "available" && (
                <div className="text-red-500 text-xs mt-1">Not bookable</div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="mt-6">
          <button
            onClick={startPayment}
            disabled={!selectedSlot || selectedSlot.status !== "available"}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow hover:scale-105 transition-all disabled:opacity-60"
          >
            Pay & Book (₹{(mentor.fee / 100).toFixed(0)})
          </button>
        </div>
        {msg && (
          <p className="mt-4 text-purple-700 animate-bounce font-medium">
            {msg}
          </p>
        )}
        <div className="mt-8 text-xs text-gray-500">
          <p>
            <span className="font-semibold">Note:</span> Payment is processed by
            Razorpay. Actual booking confirmation will be completed by the
            server when Razorpay's webhook confirms payment. If you are testing
            locally, simulate webhook or check booking status in backend.
          </p>
          <p className="mt-2">
            For testing quickly — set these in browser console (if no real user
            auth):
          </p>
          <pre className="bg-gray-100 p-2 rounded-lg mt-1">
            {`localStorage.setItem('user_id','test_user_1')\nlocalStorage.setItem('user_name','Test User')\nlocalStorage.setItem('user_email','test@example.com')`}
          </pre>
        </div>
      </motion.div>
      {/* Subtle Animated Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-10 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000" />
    </div>
  );
}
