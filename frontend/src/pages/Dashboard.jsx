"use client"

import { useState, useEffect } from "react"
import { Search, Plus } from "lucide-react"
import CreateRequirementModal from "../components/CreateRequirementModal"
import HackathonCard from "../components/HackathonCard"
import NavbarH from "../components/NavbarH"
import one from "../assets/8.png"
import { getAuthToken } from "../utils/auth"
import FeaturesPage from "./Features"

const hackathons = [
  {
    id: 1,
    title: "Adobe Express Add-ons Hackathon",
    description: "Build the next generation AI application",
    teams: 156,
    prize: "$60K",
    timeLeft: "2 days left",
    status: "Live",
    type: "ongoing",
  },
  {
    id: 2,
    title: "Web3 Hack-A-Tone ",
    description: "Create decentralized applications",
    teams: 89,
    prize: "$25K",
    timeLeft: "5 days left",
    status: "Live",
    type: "ongoing",
  },
  {
    id: 3,
    title: "MOSA Summer Hackathon 2025",
    description: "Solutions for climate change",
    teams: 203,
    prize: "$75K",
    timeLeft: "1 day left",
    status: "Live",
    type: "ongoing",
  },
  {
    id: 4,
    title: "Climate Tech Hack",
    description: "Solutions for climate change",
    teams: 203,
    prize: "$75K",
    timeLeft: "6 day left",
    status: "Live",
    type: "upcoming",
  },
]

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("ongoing")
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getAuthToken()
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/user/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!res.ok) throw new Error("User fetch failed")

        const data = await res.json()
        setUserName(data.name || "User")
      } catch (error) {
        console.error("Error fetching user:", error)
        setUserName("User") // fallback name
      }
    }

    fetchUser()
  }, [])

  const handleFindTeam = () => {
    window.location.href = "/teams"
  }

  const handleCreateRequirement = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const filteredHackathons = hackathons.filter((h) => h.type === activeTab)

  return (
    <div
      className="min-h-screen relative"
      style={{ background: "linear-gradient(135deg, #667EEA 0%, #705EBD 50%, #764CA4 100%)" }}
    >
      <NavbarH userProfile={{ name: userName }} />

      {/* Hero Section */}
      <div className="container mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Welcome back,
              </h1>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-yellow-300">{userName}! 👋</span>
              </h1>
            </div>

            <p className="text-xl text-white/90 font-medium">Ready to win your next hackathon?</p>

            <div className="flex items-center text-white/80 text-lg">
              <span className="mr-3 text-2xl">🚀</span>
              <span>Explore hackathons & build your dream team!</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleFindTeam}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium flex items-center justify-center transition-colors"
              >
                <Search className="mr-3 h-5 w-5" />
                Find your team
              </button>
              <button
                onClick={handleCreateRequirement}
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-lg text-lg font-medium flex items-center justify-center bg-transparent transition-colors"
              >
                <Plus className="mr-3 h-5 w-5" />
                Create Requirement
              </button>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative flex justify-center items-center">
              <div className="flex space-x-8">
                <img src={one || "/placeholder.svg"} alt="Team illustration" className="max-w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hackathons Section */}
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-8 py-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Discover Hackathons</h2>

          <div className="w-full">
            <div className="grid w-full max-w-sm mx-auto grid-cols-2 mb-12 h-12 bg-gray-200 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("ongoing")}
                className={`flex items-center justify-center text-base font-medium rounded-md transition-colors ${
                  activeTab === "ongoing" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                Ongoing
              </button>
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`flex items-center justify-center text-base font-medium rounded-md transition-colors ${
                  activeTab === "upcoming" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                Upcoming
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredHackathons.map((hackathon) => (
                <HackathonCard key={hackathon.id} hackathon={hackathon} />
              ))}
            </div>
            <FeaturesPage />
          </div>
        </div>
      </div>

      {/* Modal */}
      <CreateRequirementModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}

export default Dashboard
