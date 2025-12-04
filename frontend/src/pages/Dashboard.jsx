// Dashboard.jsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NavbarH from "../components/NavbarH";
import { getAuthToken } from "../utils/auth";

import {
  Users,
  MessageCircle,
  Lightbulb,
  Calendar,
  Bell,
  Award,
  Flame,
  AlertTriangle, // Added for the toast icon
} from "lucide-react";

/* ------------------------------------------------------
      GLOBAL MOTION CARD WRAPPER
------------------------------------------------------ */
const MotionCard = ({ children, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.35, ease: "easeOut" }}
    className={`bg-white rounded-xl shadow ${className}`}
  >
    {children}
  </motion.div>
);

/* ------------------------------------------------------
      SPECIAL STICKER COMPONENT
------------------------------------------------------ */
const MotivationalSticker = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.07, rotate: 1 }}
    transition={{ duration: 0.3 }}
    className="relative p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg flex items-center gap-4 border border-purple-100"
  >
    <motion.div
      className="absolute inset-0 rounded-2xl bg-white/10"
      animate={{ x: ["-120%", "120%"] }}
      transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
    />

    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="text-3xl"
    >
      🚀
    </motion.div>

    <div className="relative z-10">
      <p className="text-sm text-gray-600">Aaj bhi kuch bada karna hai!</p>
      <p className="font-semibold text-gray-800">Keep pushing 🔥</p>
    </div>
  </motion.div>
);

/* ------------------------------------------------------
      QUICK CARD COMPONENT
------------------------------------------------------ */
const QuickCard = ({ title, desc, icon, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05, y: -3 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.25 }}
    onClick={onClick}
    className="bg-white rounded-xl p-3 flex flex-col gap-2 items-start shadow-md border border-gray-100"
  >
    <motion.div whileHover={{ rotate: 8 }} className="p-2 bg-purple-50 rounded">
      {icon}
    </motion.div>
    <div className="text-sm font-semibold text-gray-800">{title}</div>
    <div className="text-xs text-gray-500">{desc}</div>
  </motion.button>
);

/* ------------------------------------------------------
      TOP-BAR TOAST COMPONENT (NEW)
------------------------------------------------------ */
const Toast = ({ message, isVisible }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -100 }}
      transition={{
        duration: 0.4,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className="fixed top-0 left-1/2 -translate-x-1/2 mt-4 z-[100] p-4 rounded-lg shadow-xl max-w-md w-full bg-purple-500 text-white font-medium flex items-center gap-3"
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      <AlertTriangle className="w-5 h-5 flex-shrink-0" />
      <span>{message}</span>
    </motion.div>
  );
};

/* ------------------------------------------------------
      MAIN COMPONENT STARTS
------------------------------------------------------ */
const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "User", wantTeam: false });
  const [streak] = useState(3);

  const [teamSummary, setTeamSummary] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [activities, setActivities] = useState([]);
  const [recommended, setRecommended] = useState([]);

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [wantTeam, setWantTeam] = useState(false);

  // NEW STATE FOR TOAST/POP-UP
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Saved idea UI states
  const [ideasLoading, setIdeasLoading] = useState(false);
  const [showIdeaForm, setShowIdeaForm] = useState(false);
  const [editingIdea, setEditingIdea] = useState(null);
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formTags, setFormTags] = useState("");

  const BASE =
    import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || "http://localhost:5000";

  /* ------------------------------------------------------
        FEATURE HANDLER FOR COMING SOON (MODIFIED)
  ------------------------------------------------------ */
  const handleFeatureComingSoon = (featureName, navigatePath) => {
    // Features marked as "Coming Soon"
    if (featureName === "Validate Idea" || featureName === "Mentorship") {
      setToastMessage(`"${featureName}" is Coming Soon!`);
      setToastVisible(true);

      // Hide the toast after a few seconds
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
    } else {
      // For other features, navigate as usual
      navigate(navigatePath);
    }
  };

  /* ------------------------------------------------------
        FETCH RECOMMENDED MEMBERS
  ------------------------------------------------------ */
  const fetchRecommended = async (token, mounted = true) => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await fetch(`${BASE}/api/user/members/want-team`, {
        headers,
      });

      if (!res.ok) return [];

      const data = await res.json();
      if (!Array.isArray(data)) return [];

      if (mounted)
        setRecommended(
          data.map((u) => ({
            id: u._id,
            name: u.name || u.email,
            skills: u.skills || [],
          }))
        );
    } catch (err) {
      console.error("fetchRecommended:", err);
    }
  };

  /* ------------------------------------------------------
        FETCH SAVED IDEAS
  ------------------------------------------------------ */
  const fetchIdeas = async (token, mounted = true) => {
    try {
      setIdeasLoading(true);
      const res = await fetch(`${BASE}/api/ideas`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return setIdeas([]);

      const data = await res.json();
      if (!Array.isArray(data)) return setIdeas([]);

      if (mounted)
        setIdeas(
          data.map((it) => ({
            id: it._id,
            title: it.title,
            desc: it.desc || "",
            tags: it.tags || [],
          }))
        );
    } catch (e) {
      console.error("fetchIdeas:", e);
      setIdeas([]);
    } finally {
      setIdeasLoading(false);
    }
  };

  /* ------------------------------------------------------
        FETCH NOTIFICATIONS
  ------------------------------------------------------ */
  const fetchNotifications = async (token, mounted = true) => {
    try {
      const res = await fetch(`${BASE}/api/notifications`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) return;

      const data = await res.json();
      if (mounted) {
        setNotifications(data);
        setUnreadCount(data.filter((n) => !n.isRead).length);
      }
    } catch (err) {
      console.error("fetchNotifications:", err);
    }
  };

  /* ------------------------------------------------------
        MARK ALL NOTIFICATIONS READ
  ------------------------------------------------------ */
  const markAllAsRead = async () => {
    const token = getAuthToken();
    try {
      await fetch(`${BASE}/api/notifications/read/all`, {
        method: "PUT",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("markAllAsRead:", err);
    }
  };

  /* ------------------------------------------------------
        OPEN CHAT WITH MEMBER
  ------------------------------------------------------ */
  const openChatWithMember = async (memberId) => {
    const token = getAuthToken();
    try {
      const res = await fetch(`${BASE}/api/chat/conversation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: memberId }),
      });

      const conv = await res.json();
      const id = conv._id || conv.id;
      navigate(`/chat/${id}`);
    } catch (e) {
      console.error(e);
      alert("Unable to open chat");
    }
  };
  /* ------------------------------------------------------
        INITIAL FETCH (profile, team, activities, recommended, ideas, notifications)
  ------------------------------------------------------ */
  useEffect(() => {
    let mounted = true;
    const token = getAuthToken();

    const fetchAll = async () => {
      try {
        // PROFILE
        if (token) {
          try {
            const res = await fetch(`${BASE}/api/user/profile`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
              const data = await res.json();
              if (mounted) {
                setUser((prev) => ({ ...prev, ...data }));
                if (typeof data.wantTeam === "boolean")
                  setWantTeam(data.wantTeam);
              }
            }
          } catch (err) {
            console.warn("profile fetch err", err);
          }
        }

        // TEAM SUMMARY (optional)
        try {
          const res = await fetch(`${BASE}/api/requirements/my`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });
          if (res.ok) {
            const data = await res.json();
            if (mounted && Array.isArray(data) && data.length) {
              setTeamSummary({
                teamname: data[0].teamname,
                message: data[0].message,
                members: data[0].currentMembers,
                required: data[0].requiredMembers,
                role: "Leader",
              });
            }
          }
        } catch (err) {
          console.warn("requirements fetch err", err);
        }

        // ACTIVITIES / Conversations (optional)
        try {
          const res = await fetch(`${BASE}/api/chat/conversation`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });
          if (res.ok) {
            const convos = await res.json();
            if (mounted && Array.isArray(convos)) {
              setActivities(
                convos.map((c) => ({
                  id: c._id,
                  text: `Chatted with ${c.otherUser?.name || "Someone"}`,
                  time: c.updatedAt || c.createdAt || new Date().toISOString(),
                }))
              );
            }
          }
        } catch (err) {
          // ignore
        }

        // RECOMMENDED
        await fetchRecommended(token, mounted);

        // SAVED IDEAS
        await fetchIdeas(token, mounted);

        // NOTIFICATIONS
        await fetchNotifications(token, mounted);
      } finally {
        // nothing extra
      }
    };

    fetchAll();
    return () => {
      mounted = false;
    };
  }, []); // eslint-disable-line

  /* ------------------------------------------------------
        TOGGLE: wantTeam
  ------------------------------------------------------ */
  const handleToggleWantTeam = async () => {
    const token = getAuthToken();
    const newVal = !wantTeam;
    setWantTeam(newVal);

    try {
      const res = await fetch(`${BASE}/api/user/want-team`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ wantTeam: newVal }),
      });

      if (!res.ok) {
        console.warn("want-team toggle failed", res.status);
        // optional: revert
        setWantTeam((p) => !p);
      } else {
        // refresh recommended so user's new status reflects
        await fetchRecommended(token);
      }
    } catch (err) {
      console.error("toggle wantTeam err", err);
      setWantTeam((p) => !p);
    }
  };

  /* ------------------------------------------------------
        Saved Ideas: open/close/edit/create/update/delete
  ------------------------------------------------------ */
  const openCreateForm = () => {
    setEditingIdea(null);
    setFormTitle("");
    setFormDesc("");
    setFormTags("");
    setShowIdeaForm(true);
  };

  const openEditForm = (idea) => {
    setEditingIdea(idea);
    setFormTitle(idea.title || "");
    setFormDesc(idea.desc || "");
    setFormTags((idea.tags || []).join(", "));
    setShowIdeaForm(true);
  };

  const closeForm = () => {
    setShowIdeaForm(false);
    setEditingIdea(null);
    setFormTitle("");
    setFormDesc("");
    setFormTags("");
  };

  const handleCreateOrUpdateIdea = async (e) => {
    e.preventDefault();
    const token = getAuthToken();
    if (!token) {
      alert("Login required");
      return;
    }

    const tagsArray = formTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // frontend limit
    if (!editingIdea && ideas.length >= 2) {
      alert("You can only save up to 2 ideas");
      return;
    }

    try {
      if (editingIdea) {
        const res = await fetch(`${BASE}/api/ideas/${editingIdea.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formTitle,
            desc: formDesc,
            tags: tagsArray,
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          alert(err.message || "Update failed");
        } else {
          const updated = await res.json();
          setIdeas((prev) =>
            prev.map((it) =>
              it.id === updated._id
                ? {
                    id: updated._id,
                    title: updated.title,
                    desc: updated.desc || "",
                    tags: updated.tags || [],
                  }
                : it
            )
          );
          closeForm();
        }
      } else {
        const res = await fetch(`${BASE}/api/ideas`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formTitle,
            desc: formDesc,
            tags: tagsArray,
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          alert(err.message || "Create failed");
        } else {
          const created = await res.json();
          setIdeas((prev) =>
            [
              {
                id: created._id,
                title: created.title,
                desc: created.desc || "",
                tags: created.tags || [],
              },
              ...prev,
            ].slice(0, 2)
          );
          closeForm();
        }
      }
    } catch (err) {
      console.error("idea create/update error", err);
      alert("Network error");
    }
  };

  const handleDeleteIdea = async (ideaId) => {
    if (!confirm("Delete this idea?")) return;
    const token = getAuthToken();
    try {
      const res = await fetch(`${BASE}/api/ideas/${ideaId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.message || "Delete failed");
      } else {
        setIdeas((prev) => prev.filter((i) => i.id !== ideaId));
      }
    } catch (err) {
      console.error("delete idea err", err);
      alert("Network error");
    }
  };
  /* ------------------------------------------------------
        RENDER UI
  ------------------------------------------------------ */
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f8ff] to-[#eef2ff] overflow-x-hidden">
      <NavbarH userProfile={{ name: user?.name }} />

      {/* RENDER THE TOAST COMPONENT */}
      <Toast message={toastMessage} isVisible={toastVisible} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-8"
      >
        {/* ---------------- TOP SECTION ---------------- */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8">
          {/* LEFT SIDE HEADER */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold"
            >
              Hey {user?.name} 👋
            </motion.h1>

            <p className="text-gray-600 mt-1">
              Welcome to your HackVerse control center.
            </p>
          </div>

          {/* RIGHT SIDE — BELL + STICKER */}
          <div className="flex items-center gap-4">
            {/* NOTIFICATION BELL */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="relative cursor-pointer"
              onClick={markAllAsRead}
            >
              <Bell className="w-7 h-7 text-purple-600" />

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </motion.div>

            <MotivationalSticker />
          </div>
        </div>

        {/* ---------------- 3-COLUMN GRID ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SIDE — 2 COLUMNS */}
          <div className="lg:col-span-2 space-y-6">
            {/* QUICK ACTION CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <QuickCard
                title="Find Team"
                desc="Discover teams"
                icon={<Users />}
                onClick={() => navigate("/teams")}
              />

              <QuickCard
                title="Validate Idea"
                desc="AI powered"
                icon={<Lightbulb />}
                onClick={() =>
                  handleFeatureComingSoon("Validate Idea", "/validate")
                }
              />

              <QuickCard
                title="Chat"
                desc="Open messages"
                icon={<MessageCircle />}
                onClick={() => navigate("/chats")}
              />

              <QuickCard
                title="Mentorship"
                desc="Book mentor"
                icon={<Calendar />}
                onClick={() =>
                  handleFeatureComingSoon("Mentorship", "/mentorship")
                }
              />
            </div>

            {/* ---------------- TEAM + SAVED IDEAS ---------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* TEAM CARD */}
              <MotionCard className="p-6">
                <h3 className="font-semibold text-lg mb-3">My Team</h3>

                {!teamSummary ? (
                  <p>No team data found.</p>
                ) : (
                  <>
                    <h4 className="text-xl font-bold">
                      {teamSummary.teamname}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {teamSummary.message}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Members</p>
                        <p className="font-medium">
                          {teamSummary.members} joined • need{" "}
                          {teamSummary.required}
                        </p>
                      </div>

                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                        {teamSummary.role}
                      </span>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <button
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg"
                        onClick={() => navigate("/requirements")}
                      >
                        Manage Team
                      </button>
                    </div>
                  </>
                )}
              </MotionCard>

              {/* ---------------- SAVED IDEAS SECTION ---------------- */}
              <MotionCard className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-lg">Saved Ideas</h3>

                  <button
                    onClick={openCreateForm}
                    className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
                  >
                    + New
                  </button>
                </div>

                {/* LOADING */}
                {ideasLoading ? (
                  <p className="text-sm text-gray-500">Loading ideas…</p>
                ) : ideas.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No saved ideas yet. Click + New to add.
                  </p>
                ) : (
                  ideas.map((it) => (
                    <div
                      key={it.id}
                      className="border p-3 rounded-lg mb-3 flex justify-between"
                    >
                      <div className="w-3/4">
                        <p className="font-medium">{it.title}</p>
                        <p className="text-xs text-gray-500">{it.desc}</p>

                        <div className="flex gap-2 mt-1">
                          {it.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-1 text-xs bg-gray-100 rounded-full"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 items-end">
                        <button
                          className="text-sm text-purple-600"
                          onClick={() => openEditForm(it)}
                        >
                          Edit
                        </button>

                        <button
                          className="text-sm text-red-500"
                          onClick={() => handleDeleteIdea(it.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}

                {/* INLINE IDEA FORM */}
                {showIdeaForm && (
                  <div className="mt-3 p-3 border rounded bg-gray-50">
                    <form onSubmit={handleCreateOrUpdateIdea}>
                      <label className="text-sm font-medium">Title</label>
                      <input
                        required
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        placeholder="Idea title"
                      />

                      <label className="text-sm font-medium">Description</label>
                      <textarea
                        value={formDesc}
                        onChange={(e) => setFormDesc(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        rows={3}
                      />

                      <label className="text-sm font-medium">
                        Tags (comma separated)
                      </label>
                      <input
                        value={formTags}
                        onChange={(e) => setFormTags(e.target.value)}
                        className="w-full p-2 border rounded mb-3"
                      />

                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                        >
                          {editingIdea ? "Update" : "Create"}
                        </button>

                        <button
                          type="button"
                          onClick={closeForm}
                          className="px-3 py-1 border rounded text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </MotionCard>
            </div>
          </div>

          {/* ---------------- RIGHT SIDEBAR ---------------- */}
          <div className="space-y-6">
            {/* RECOMMENDED MEMBERS */}
            <MotionCard className="p-5">
              <h3 className="font-semibold mb-3">Recommended Members</h3>

              {recommended.length === 0 ? (
                <p className="text-sm text-gray-500">No recommended users.</p>
              ) : (
                recommended.map((r) => (
                  <div key={r.id} className="flex justify-between mb-4">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-full font-medium">
                        {r.name?.[0] || "U"}
                      </div>

                      <div>
                        <p className="font-medium">{r.name}</p>
                        <p className="text-xs text-gray-500">
                          {r.skills.slice(0, 3).join(", ")}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => openChatWithMember(r.id)}
                      className="px-3 py-1 border rounded text-xs hover:bg-gray-50"
                    >
                      Message
                    </button>
                  </div>
                ))
              )}
            </MotionCard>

            {/* WANT TEAM TOGGLE */}
            <MotionCard className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Looking for a team?</p>
                  <p className="text-xs text-gray-500">
                    Toggle to show you're open for team matching.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">
                    {wantTeam ? "ON" : "OFF"}
                  </span>

                  <button
                    onClick={handleToggleWantTeam}
                    aria-pressed={wantTeam}
                    className={`w-14 h-8 flex items-center p-1 rounded-full transition-all ${
                      wantTeam ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-6 h-6 rounded-full shadow transform transition-transform ${
                        wantTeam ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </MotionCard>
          </div>
        </div>
      </motion.main>
    </div>
  );
};
/* ------------------------------------------------------
      PART-4 — UTILITIES + EXPORT
------------------------------------------------------ */

function formatTime(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return "some time";
  }
}

export default Dashboard;
