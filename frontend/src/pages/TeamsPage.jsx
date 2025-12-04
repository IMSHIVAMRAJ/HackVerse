"use client";

import { useState, useEffect } from "react";
import { Users, Search, MessageCircle } from "lucide-react";
import NavbarH from "../components/NavbarH";
import { getAuthToken } from "../utils/auth";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// ========================================================
// Motivational Sticker
// ========================================================

const MotivationalSticker = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.05 }}
    className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 shadow-sm border border-indigo-100 flex items-center gap-4"
  >
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ repeat: Infinity, duration: 1.6 }}
      className="text-3xl"
    >
      🤝
    </motion.div>

    <div>
      <p className="text-sm text-gray-600">Teamwork = 50% Victory 😎</p>
      <p className="font-semibold text-gray-800">Find your perfect squad!</p>
    </div>
  </motion.div>
);

// ========================================================
// MAIN PAGE
// ========================================================

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  // ---------------- FETCH TEAMS ----------------
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const token = getAuthToken();

        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/requirements/team`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        if (!res.ok) throw new Error("Failed to load teams");

        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.teams || [];
        const safe = list.filter((t) => t && typeof t === "object");

        setTeams(safe);
        setFilteredTeams(safe);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // ---------------- SEARCH FILTER ----------------
  useEffect(() => {
    const s = searchTerm.toLowerCase();

    if (!s) return setFilteredTeams(teams);

    setFilteredTeams(
      teams.filter((t) => {
        const tn = t.teamname?.toLowerCase() || "";
        const msg = t.message?.toLowerCase() || "";
        const dom = t.domains?.join(" ").toLowerCase() || "";
        const skl = t.skillsNeeded?.join(" ").toLowerCase() || "";

        return tn.includes(s) || msg.includes(s) || dom.includes(s) || skl.includes(s);
      })
    );
  }, [searchTerm, teams]);

  // ---------------- LOADING ----------------
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Loading teams…
      </div>
    );

  // ---------------- ERROR ----------------
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
        {error}
      </div>
    );

  // ---------------- MAIN RETURN ----------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      <NavbarH userProfile={{ name: "Shivam" }} />

      <div className="container mx-auto px-8 pt-16">
        <h1 className="text-5xl font-bold text-center mb-4">Find Your Team</h1>

        <div className="flex justify-center mb-10">
          <MotivationalSticker />
        </div>

        {/* ---------------- SEARCH BAR ---------------- */}
        <div className="max-w-md mx-auto relative mb-12">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-3 rounded-lg border shadow-sm bg-white"
            placeholder="Search teams, skills or domains..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* ---------------- TEAMS SECTION ---------------- */}
      <div className="container mx-auto px-8 pb-20">
        <h2 className="text-3xl font-semibold text-center mb-10">
          {filteredTeams.length} Teams Available
        </h2>

        {/* Vertical layout */}
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
          {filteredTeams.map((team, index) => (
            <TeamCard key={team._id || index} team={team} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TeamsPage;

// ========================================================
// PREMIUM VERTICAL TEAM CARD
// ========================================================

const TeamCard = ({ team }) => {
  const navigate = useNavigate();
  if (!team) return null;

  const getTags = (x) => (Array.isArray(x) ? x : x?.split(",") || []);

  const handleChat = async () => {
    try {
      const token = getAuthToken();

      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/chat/conversation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: team.postedBy._id }),
        }
      );

      const convo = await res.json();
      navigate(`/chat/${convo._id}`);
    } catch (err) {
      console.error("CHAT ERROR:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.25 }}
      className="
        w-full
        bg-white 
        rounded-3xl 
        border 
        border-gray-200 
        p-6 
        shadow-sm 
        hover:shadow-md 
        transition-all
      "
    >
      {/* ---------------- Header ---------------- */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{team.teamname}</h3>
          <p className="text-gray-600 text-sm mt-1">{team.message}</p>
        </div>

        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
          <Users className="w-4 h-4" />
          {team.currentMembers}/{team.requiredMembers}
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-gray-200 to-gray-100 mb-4"></div>

      {/* ---------------- Domains ---------------- */}
      {team.domains && (
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-1">Domains</p>
          <div className="flex flex-wrap gap-2">
            {getTags(team.domains).map((d, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- Skills ---------------- */}
      <div className="mb-4">
        <p className="text-xs text-gray-400 mb-1">Skills Needed</p>
        <div className="flex flex-wrap gap-2">
          {getTags(team.skillsNeeded).map((s, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-full"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ---------------- Footer ---------------- */}
      <div className="flex items-center justify-between mt-6">
        {/* Leader Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg font-medium">
            {team.postedBy.name[0]}
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">
              {team.postedBy.name}
            </p>
            <p className="text-xs text-gray-400">Team Leader</p>
          </div>
        </div>

        {/* Chat Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleChat}
          className="
            bg-gradient-to-r 
            from-purple-600 
            to-indigo-600 
            text-white 
            px-5 
            py-2 
            rounded-xl 
            text-sm 
            font-medium 
            shadow-md
          "
        >
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Chat
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};
