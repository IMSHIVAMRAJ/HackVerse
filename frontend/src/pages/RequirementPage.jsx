"use client"

import { useState, useEffect } from "react"
import { Users, Mail, Linkedin, Edit, Calendar, MessageCircle, Settings } from "lucide-react"
import NavbarH from "../components/NavbarH"
import { getAuthToken } from "../utils/auth"
import UpdateRequirementModal from "../components/UpdateRequirementModal"

const RequirementsPage = () => {
  const [requirements, setRequirements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedRequirement, setSelectedRequirement] = useState(null)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  // Fetch user's requirements from backend
  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        setLoading(true)
        setError(null)

        const token = getAuthToken()

        if (!token) {
          throw new Error("Please log in to view your requirements")
        }

        const response = await fetch("http://localhost:5000/api/requirements/my", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Session expired. Please login again.")
          }
          throw new Error(`Failed to fetch requirements: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        console.log("Requirements data:", data) // Debug log

        // Handle different response structures
        const requirementsArray = Array.isArray(data) ? data : data.requirements || data.data || []
        setRequirements(requirementsArray)
      } catch (err) {
        setError(err.message)
        console.error("Error fetching requirements:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchRequirements()
  }, [])

  const handleUpdateRequirement = (requirement) => {
    setSelectedRequirement(requirement)
    setIsUpdateModalOpen(true)
  }

  const handleUpdateSuccess = (updatedRequirement) => {
    // Update the requirements list with the updated requirement
    setRequirements((prev) => prev.map((req) => (req._id === updatedRequirement._id ? updatedRequirement : req)))
    setIsUpdateModalOpen(false)
    setSelectedRequirement(null)
  }

  if (loading) {
    return (
      <div
        className="min-h-screen"
        style={{ background: "linear-gradient(135deg, #667EEA 0%, #705EBD 50%, #764CA4 100%)" }}
      >
        <NavbarH userProfile={{ name: "Shivam" }} />
        <div className="container mx-auto px-8 py-16">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <div className="text-white text-xl">Loading your requirements...</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className="min-h-screen"
        style={{ background: "linear-gradient(135deg, #667EEA 0%, #705EBD 50%, #764CA4 100%)" }}
      >
        <NavbarH userProfile={{ name: "Shivam" }} />
        <div className="container mx-auto px-8 py-16">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="text-red-300 text-xl mb-4">⚠️ Error Loading Requirements</div>
              <div className="text-red-200 text-sm mb-4">{error}</div>
              <div className="space-x-4">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                >
                  Try Again
                </button>
                {error.includes("login") && (
                  <button
                    onClick={() => (window.location.href = "/")}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Go to Home
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #667EEA 0%, #705EBD 50%, #764CA4 100%)" }}
    >
      <NavbarH userProfile={{ name: "Shivam" }} />

      {/* Header Section */}
      <div className="container mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">My Requirements</h1>
          <p className="text-xl text-white/90 font-medium mb-4">
            Manage your team requirements and find the perfect members
          </p>
          <div className="flex items-center justify-center text-white/80 text-lg mb-8">
            <span className="mr-3 text-2xl">📋</span>
            <span>Keep track of your team building progress!</span>
          </div>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-8 py-20">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-center text-gray-900 w-full">Your Team Requirements</h2>
          </div>

          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center text-gray-600">
              <Settings className="w-5 h-5 mr-2" />
              <span className="text-lg font-medium">
                {requirements.length} requirement{requirements.length !== 1 ? "s" : ""} found
              </span>
            </div>
          </div>

          {requirements.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-500 text-xl mb-4">No requirements found</div>
              <p className="text-gray-400 mb-6">You haven't created any team requirements yet.</p>
              <button
                onClick={() => (window.location.href = "/")}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Create Your First Requirement
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {requirements.map((requirement, index) => (
                <RequirementCard
                  key={requirement._id || requirement.id || index}
                  requirement={requirement}
                  onUpdate={handleUpdateRequirement}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Update Modal */}
      {selectedRequirement && (
        <UpdateRequirementModal
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setIsUpdateModalOpen(false)
            setSelectedRequirement(null)
          }}
          requirement={selectedRequirement}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  )
}

// Requirement Card Component
const RequirementCard = ({ requirement, onUpdate }) => {
  const handleLinkedInClick = () => {
    if (requirement.linkedeinProfile) {
      window.open(requirement.linkedeinProfile, "_blank")
    }
  }

  const handleEmailClick = () => {
    if (requirement.email) {
      window.location.href = `mailto:${requirement.email}`
    }
  }

  // Calculate days until expiry
  const getDaysUntilExpiry = () => {
    if (!requirement.expiryDate) return null
    const today = new Date()
    const expiry = new Date(requirement.expiryDate)
    const diffTime = expiry - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysUntilExpiry = getDaysUntilExpiry()

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-0 relative">
      <div className="p-6">
        {/* Header with status and time left */}
        <div className="flex justify-between items-start mb-4">
          <span className="bg-green-500 text-white px-3 py-1 text-sm font-medium rounded-full">Active</span>
          <div className="flex items-center space-x-2">
            {daysUntilExpiry !== null && (
              <span
                className={`text-sm font-medium ${
                  daysUntilExpiry <= 3 ? "text-red-500" : daysUntilExpiry <= 7 ? "text-orange-500" : "text-gray-500"
                }`}
              >
                {daysUntilExpiry > 0 ? `${daysUntilExpiry} days left` : "Expired"}
              </span>
            )}
            <button
              onClick={() => onUpdate(requirement)}
              className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
              title="Update Requirement"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Team Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{requirement.teamname || "Team Name"}</h3>

        {/* Message */}
        <div className="mb-4">
          <div className="flex items-start mb-2">
            <MessageCircle className="w-4 h-4 mr-2 text-purple-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-700">Message</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed pl-6">{requirement.message || "No message provided"}</p>
        </div>

        {/* Domain Tags */}
        {requirement.domains && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Domains:</h4>
            <div className="flex flex-wrap gap-2">
              {requirement.domains.split(",").map((domain, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  {domain.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Skills Required */}
        {requirement.skillsNeeded && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Skills Needed:</h4>
            <div className="flex flex-wrap gap-2">
            {(Array.isArray(requirement.skillsNeeded) ? requirement.skillsNeeded : (requirement.skillsNeeded || "").split(",")).map((skill, index) => (

                <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Members Info */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-medium">
              {requirement.currentMembers || 0} current • Need {requirement.requiredMembers || 0} more
            </span>
          </div>
        </div>

        {/* Expiry Date */}
        {requirement.expiryDate && (
          <div className="flex items-center text-gray-600 mb-4">
            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-sm">Expires: {new Date(requirement.expiryDate).toLocaleDateString()}</span>
          </div>
        )}

        {/* Contact Options */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Contact Information</h4>
          <div className="flex space-x-3">
            {requirement.linkedeinProfile && (
              <button
                onClick={handleLinkedInClick}
                className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex-1 justify-center"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </button>
            )}
            {requirement.email && (
              <button
                onClick={handleEmailClick}
                className="flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors flex-1 justify-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </button>
            )}
          </div>

          {!requirement.linkedeinProfile && !requirement.email && (
            <div className="text-center py-2 text-gray-500 text-sm">No contact information available</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RequirementsPage
