"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";
import { getAuthToken } from "../utils/auth";
import NavbarH from "../components/NavbarH"; // ⭐ IMPORTANT

const ChatPage = () => {
  const { conversationId } = useParams();
  const userId = localStorage.getItem("userId");
  const [messages, setMessages] = useState([]);
  const [msgText, setMsgText] = useState("");
  const [receiverId, setReceiverId] = useState(null);
  const [userName, setUserName] = useState("User"); // header ke liye name
  const scrollRef = useRef();

  // Fetch user name for header
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getAuthToken();
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/user/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        if (data?.name) setUserName(data.name);
      } catch (err) {
        console.log("User fetch error ->", err);
      }
    };

    fetchUser();
  }, []);

  // Fetch messages + conversation
  useEffect(() => {
    const loadMessages = async () => {
      const token = getAuthToken();

      // 1) Load Messages
      const msgRes = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/chat/messages/${conversationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const msgs = await msgRes.json();
      setMessages(msgs);

      // 2) Fetch conversation to get receiver ID
      const convoRes = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/chat/conversation/${conversationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const convo = await convoRes.json();

      const other = convo.participants.find((p) => p._id !== userId);
      setReceiverId(other?._id);
    };

    loadMessages();
  }, [conversationId, userId]);

  // Register user socket
  useEffect(() => {
    socket.emit("register", userId);
  }, [userId]);

  // Listen for realtime messages
  useEffect(() => {
    socket.on("receive-message", (msg) => {
      if (msg.conversationId === conversationId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("receive-message");
  }, [conversationId]);

  // Scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const sendMessage = async () => {
    if (!msgText.trim()) return;

    const token = getAuthToken();

    // Save to DB
    await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/chat/message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ conversationId, text: msgText }),
      }
    );

    // Emit realtime
    socket.emit("send-message", {
      conversationId,
      receiverId,
      text: msgText,
      senderId: userId,
    });

    setMsgText("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f0f4ff] to-[#e8ecfc] relative">

      {/* ⭐ Header (SAME AS DASHBOARD) */}
      <NavbarH userProfile={{ name: userName }} />

      {/* Animated Stickers */}
      <div className="absolute bottom-12 left-1/3 animate-float z-0">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" fill="#8b5cf6" opacity="0.18" />
          <path
            d="M24 14L28 24H20L24 34"
            stroke="#8b5cf6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="absolute top-16 right-24 animate-float-slow z-0">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect
            x="8"
            y="8"
            width="24"
            height="24"
            rx="6"
            fill="#8b5cf6"
            opacity="0.12"
          />
          <path
            d="M20 14V26M14 20H26"
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Messages */}
      <div className="flex-1 p-8 overflow-y-auto z-10 mt-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-3 flex ${
              m.senderId === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`inline-block max-w-lg px-5 py-3 rounded-2xl shadow-lg border transition-all
                ${
                  m.senderId === userId
                    ? "bg-gradient-to-r from-purple-200 to-blue-100 text-purple-900 border-purple-300"
                    : "bg-white/90 text-gray-700 border-blue-100"
                }
              `}
              style={{
                boxShadow:
                  m.senderId === userId
                    ? "0 2px 12px 0 rgba(139,92,246,0.10)"
                    : "0 2px 12px 0 rgba(59,130,246,0.08)",
              }}
            >
              <span className="whitespace-pre-line text-base font-medium">
                {m.text}
              </span>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="p-6 bg-white/80 backdrop-blur flex gap-2 border-t border-purple-100 z-10">
        <input
          className="flex-1 border-2 border-purple-400 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-purple-300 bg-white/90 text-gray-700 shadow-md transition-all duration-200"
          value={msgText}
          onChange={(e) => setMsgText(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold shadow hover:scale-105 transition-all"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
