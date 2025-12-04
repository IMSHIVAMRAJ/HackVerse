import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../utils/auth";
import NavbarH from "../components/NavbarH";   // Make sure correct path hai

const ChatsList = () => {
  const [conversations, setConversations] = useState([]);
  const [userName, setUserName] = useState("");   // << 🆕 username state
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // ---------- LOAD USER NAME ----------
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
        setUserName(data.name || "User");
      } catch (err) {
        console.error(err);
        setUserName("User");
      }
    };

    fetchUser();
  }, []);

  // ---------- LOAD CONVERSATIONS ----------
  useEffect(() => {
    const loadConvos = async () => {
      const token = getAuthToken();
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/chat/conversation`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await res.json();
      setConversations(data);
    };

    loadConvos();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f0f4ff] to-[#e8ecfc]">
      
      {/* 👇 NOW NAVBAR ALSO SHOWS USER NAME */}
      <NavbarH userProfile={{ name: userName }} />

      <div className="flex flex-row flex-1 items-stretch">
        {/* LEFT SIDEBAR */}
        <aside className="w-80 h-[calc(100vh-64px)] mt-0 pt-8 px-0 border-r border-purple-200/30 bg-gradient-to-br from-purple-100 via-purple-200 to-blue-100 backdrop-blur flex flex-col shadow-xl">
          <h2 className="text-xl font-bold mb-6 text-purple-700 px-8 drop-shadow">
            Chats
          </h2>

          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-8 text-center text-purple-400/60">
                No chats yet.
              </div>
            ) : (
              conversations.map((c) => {
                const otherUser = c.participants.find((u) => u._id !== userId);
                const avatar =
                  otherUser?.avatarUrl ||
                  `https://ui-avatars.com/api/?name=${
                    otherUser?.name || "U"
                  }&background=f0f4ff&color=8b5cf6&size=128`;

                return (
                  <div
                    key={c._id}
                    className="flex items-center gap-3 px-8 py-3 hover:bg-purple-50/40 transition cursor-pointer border-b border-purple-100/20"
                    onClick={() => navigate(`/chat/${c._id}`)}
                  >
                    <img
                      src={avatar}
                      alt={otherUser?.name || "User"}
                      className="w-10 h-10 rounded-full object-cover border-2 border-purple-200/40 shadow"
                    />
                    <span className="text-purple-700 font-medium text-base">
                      {otherUser?.name || "Unknown User"}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          <button
            className="flex items-center gap-2 px-8 py-3 mt-4 mb-6 text-purple-700 hover:text-purple-900 font-semibold transition"
            onClick={() => navigate(-1)}
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back
          </button>
        </aside>

        {/* RIGHT EMPTY STATE */}
        <div className="flex-1 flex flex-col items-center justify-center relative bg-transparent">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-bounce mb-4">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <rect
                  x="8"
                  y="8"
                  width="40"
                  height="40"
                  rx="12"
                  fill="#8b5cf6"
                  opacity="0.15"
                />
                <path
                  d="M18 28H38M18 28L24 22M18 28L24 34"
                  stroke="#8b5cf6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-purple-700 mb-2 animate-grow drop-shadow">
              Click a chat to grow!
            </h2>
            <p className="text-purple-400 text-base mb-8">
              Select a conversation from the sidebar to start chatting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsList;
