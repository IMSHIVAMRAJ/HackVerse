"use client";

import { useState, useEffect } from "react";
import { Users, Mail, Linkedin, Search, Filter } from "lucide-react";
import NavbarH from "../components/NavbarH";
import { getAuthToken } from "../utils/auth";
import Footer from "../components/Footer";

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTeams, setFilteredTeams] = useState([]);

  // Fetch teams from backend
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = getAuthToken();
        const headers = { "Content-Type": "application/json" };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/requirements/team`,
          { method: "GET", headers }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch teams: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const teamsArray = Array.isArray(data) ? data : data.teams || data.data || [];
        setTeams(teamsArray);
        setFilteredTeams(teamsArray);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching teams:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Filter teams based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredTeams(teams);
    } else {
      const filtered = teams.filter((team) => {
        const searchTermLower = searchTerm.toLowerCase();
        // Handle both string and array for domains/skills
        const domainsMatch = Array.isArray(team.domains)
          ? team.domains.some(d => d.toLowerCase().includes(searchTermLower))
          : team.domains?.toLowerCase().includes(searchTermLower);
        
        const skillsMatch = Array.isArray(team.skillsNeeded)
          ? team.skillsNeeded.some(s => s.toLowerCase().includes(searchTermLower))
          : team.skillsNeeded?.toLowerCase().includes(searchTermLower);

        return (
          team.teamname?.toLowerCase().includes(searchTermLower) ||
          domainsMatch ||
          team.message?.toLowerCase().includes(searchTermLower) ||
          skillsMatch
        );
      });
      setFilteredTeams(filtered);
    }
  }, [searchTerm, teams]);

  if (loading) {
    // Return Loading UI
    return (
        <div className="min-h-screen" style={{background: "linear-gradient(135deg, #667EEA 0%, #705EBD 50%, #764CA4 100%)"}}>
          <NavbarH userProfile={{ name: "Shivam" }} />
          <div className="container mx-auto px-8 py-16">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <div className="text-white text-xl">Loading teams...</div>
              </div>
            </div>
          </div>
        </div>
      );
  }

  if (error) {
    // Return Error UI
    return (
        <div className="min-h-screen" style={{background: "linear-gradient(135deg, #667EEA 0%, #705EBD 50%, #764CA4 100%)"}}>
          <NavbarH userProfile={{ name: "Shivam" }} />
          <div className="container mx-auto px-8 py-16">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="text-red-300 text-xl mb-4">⚠️ Error Loading Teams</div>
                <div className="text-red-200 text-sm">{error}</div>
                <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">Try Again</button>
              </div>
            </div>
          </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen" style={{background: "linear-gradient(135deg, #667EEA 0%, #705EBD 50%, #764CA4 100%)"}}>
      <NavbarH userProfile={{ name: "Shivam" }} />

      {/* Header Section */}
      <div className="container mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Find Your Team</h1>
          <p className="text-xl text-white/90 font-medium mb-4">Connect with amazing teams looking for talented members</p>
          <div className="flex items-center justify-center text-white/80 text-lg mb-8">
            <span className="mr-3 text-2xl">🤝</span>
            <span>Join forces and build something incredible together!</span>
          </div>
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search teams by name, domain, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border-0 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Teams Section */}
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-8 py-20">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-center text-gray-900 w-full">Discover Teams</h2>
          </div>
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center text-gray-600">
              <Filter className="w-5 h-5 mr-2" />
              <span className="text-lg font-medium">{filteredTeams.length} teams available</span>
            </div>
          </div>

          {filteredTeams.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-500 text-xl mb-4">
                {searchTerm ? "No teams match your search" : "No teams available at the moment"}
              </div>
              <p className="text-gray-400">
                {searchTerm ? "Try adjusting your search terms" : "Check back later for new team opportunities!"}
              </p>
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTeams.map((team, index) => (
                <TeamCard key={team._id || team.id || index} team={team} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Team Card Component - Corrected and made more robust
const TeamCard = ({ team }) => {
    const handleLinkedInClick = () => {
      if (team.linkedinProfile) {
        window.open(team.linkedinProfile, "_blank");
      }
    };
  
    const handleEmailClick = () => {
      if (team.email) {
        window.location.href = `mailto:${team.email}`;
      }
    };
  
    const getDaysUntilExpiry = () => {
      if (!team.expiryDate) return null;
      const today = new Date();
      const expiry = new Date(team.expiryDate);
      const diffTime = expiry - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };
  
    const daysUntilExpiry = getDaysUntilExpiry();
  
    // Helper to safely handle both array and string data for tags
    const getTagsArray = (data) => {
      if (!data) return [];
      if (Array.isArray(data)) return data;
      return data.split(",").map(item => item.trim());
    };
  
    const domainTags = getTagsArray(team.domains);
    const skillTags = getTagsArray(team.skillsNeeded);
  
    return (
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-0">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="bg-red-500 text-white px-3 py-1 text-sm font-medium rounded-full">Active</span>
            {daysUntilExpiry !== null && (
              <span className="text-sm text-gray-500 font-medium">
                {daysUntilExpiry >= 0 ? `${daysUntilExpiry} days left` : "Expired"}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{team.teamname || "Team Name"}</h3>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">{team.message || "No message provided"}</p>
  
          {domainTags.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {domainTags.map((domain, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    {domain}
                  </span>
                ))}
              </div>
            </div>
          )}
  
          {skillTags.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Skills Required:</h4>
              <div className="flex flex-wrap gap-2">
                {skillTags.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
  
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-sm font-medium">
                {team.currentMembers || 0} current • Need {team.requiredMembers || 0} more
              </span>
            </div>
          </div>
  
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Contact Team</h4>
            <div className="flex space-x-3">
              {team.linkedinProfile && (
                <button onClick={handleLinkedInClick} className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex-1 justify-center">
                  <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
                </button>
              )}
              {team.email && (
                <button onClick={handleEmailClick} className="flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors flex-1 justify-center">
                  <Mail className="w-4 h-4 mr-2" /> Email
                </button>
              )}
            </div>
            {!team.linkedinProfile && !team.email && (
              <div className="text-center py-2 text-gray-500 text-sm">No contact information available</div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
export default TeamsPage;