"use client"

import { useState, useEffect } from "react"
import { User, Mail, Lock, Github, Linkedin, Camera, Save, Loader2 } from "lucide-react"

import { getAuthToken } from "../utils/auth"
import Navbar from "../components/NavbarH"

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: "",
    skills: "",
    github: "",
    linkedin: "",
  })
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  // Fetch user profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        setError(null)

        const token = getAuthToken()

        if (!token) {
          throw new Error("Please log in to view your profile")
        }

        const response = await fetch("http://localhost:5000/api/user/profile", {
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
          throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        console.log("Profile data:", data) // Debug log

        // Handle different response structures
        const profile = data.user || data.profile || data
        setProfileData({
          name: profile.name || "",
          email: profile.email || "",
          password: "", // Don't populate password field
          profilePic: profile.profilePic || "",
          skills: profile.skills || "",
          github: profile.github || "",
          linkedin: profile.linkedin || "",
        })

        // Set image preview if profile pic exists
        if (profile.profilePic) {
          setImagePreview(profile.profilePic)
        }
      } catch (err) {
        setError(err.message)
        console.error("Error fetching profile:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdating(true)
    setError(null)
    setSuccess(false)

    try {
      const token = getAuthToken()

      if (!token) {
        throw new Error("Please log in to update your profile")
      }

      // Create FormData for file upload
      const formData = new FormData()
      formData.append("name", profileData.name)
      formData.append("email", profileData.email)
      if (profileData.password) {
        formData.append("password", profileData.password)
      }
      formData.append("skills", profileData.skills)
      formData.append("github", profileData.github)
      formData.append("linkedin", profileData.linkedin)

      // Add profile picture if selected
      if (selectedFile) {
        formData.append("profilePic", selectedFile)
      }

      const response = await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type for FormData, let browser set it
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 401) {
          throw new Error("Session expired. Please login again.")
        }
        throw new Error(errorData.message || `Failed to update profile: ${response.status}`)
      }

      const result = await response.json()
      console.log("Profile updated successfully:", result)

      setSuccess(true)

      // Clear password field after successful update
      setProfileData((prev) => ({ ...prev, password: "" }))
      setSelectedFile(null)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Error updating profile:", error)
      setError(error.message)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div
        className="min-h-screen"
        style={{ background: "linear-gradient(135deg, #667EEA 0%, #705EBD 50%, #764CA4 100%)" }}
      >
        <Navbar />
        <div className="container mx-auto px-8 py-16">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <div className="text-white text-xl">Loading your profile...</div>
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
        <Navbar />
        <div className="container mx-auto px-8 py-16">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="text-red-300 text-xl mb-4">⚠️ Error Loading Profile</div>
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
      <Navbar />

      {/* Header Section */}
      <div className="container mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">My Profile</h1>
          <p className="text-xl text-white/90 font-medium mb-4">
            Update your profile information and showcase your skills
          </p>
          <div className="flex items-center justify-center text-white/80 text-lg mb-8">
            <span className="mr-3 text-2xl">👤</span>
            <span>Keep your profile up to date!</span>
          </div>
        </div>
      </div>

      {/* Profile Form Section */}
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-8 py-20">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Update Profile</h2>

              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">Profile updated successfully!</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">Error: {error}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                      {imagePreview ? (
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-purple-100">
                          <User className="w-16 h-16 text-purple-400" />
                        </div>
                      )}
                    </div>
                    <label
                      htmlFor="profilePic"
                      className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition-colors shadow-lg"
                    >
                      <Camera className="w-4 h-4" />
                    </label>
                    <input
                      id="profilePic"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      disabled={updating}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Click the camera icon to upload a new profile picture</p>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700">
                    <User className="w-4 h-4 mr-2 text-purple-600" />
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={profileData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                    disabled={updating}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700">
                    <Mail className="w-4 h-4 mr-2 text-purple-600" />
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                    disabled={updating}
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label htmlFor="password" className="flex items-center text-sm font-medium text-gray-700">
                    <Lock className="w-4 h-4 mr-2 text-purple-600" />
                    New Password (leave blank to keep current)
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={profileData.password}
                    onChange={handleInputChange}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    disabled={updating}
                  />
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <label htmlFor="skills" className="flex items-center text-sm font-medium text-gray-700">
                    <span className="w-4 h-4 mr-2 text-purple-600">🛠️</span>
                    Skills
                  </label>
                  <textarea
                    id="skills"
                    name="skills"
                    value={profileData.skills}
                    onChange={handleInputChange}
                    placeholder="e.g., React, Node.js, Python, UI/UX Design, Machine Learning"
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    disabled={updating}
                  />
                </div>

                {/* GitHub */}
                <div className="space-y-2">
                  <label htmlFor="github" className="flex items-center text-sm font-medium text-gray-700">
                    <Github className="w-4 h-4 mr-2 text-purple-600" />
                    GitHub Profile
                  </label>
                  <input
                    id="github"
                    name="github"
                    type="url"
                    value={profileData.github}
                    onChange={handleInputChange}
                    placeholder="https://github.com/yourusername"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    disabled={updating}
                  />
                </div>

                {/* LinkedIn */}
                <div className="space-y-2">
                  <label htmlFor="linkedin" className="flex items-center text-sm font-medium text-gray-700">
                    <Linkedin className="w-4 h-4 mr-2 text-purple-600" />
                    LinkedIn Profile
                  </label>
                  <input
                    id="linkedin"
                    name="linkedin"
                    type="url"
                    value={profileData.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    disabled={updating}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-6 py-4 bg-purple-600 text-white text-lg font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={updating}
                  >
                    {updating ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Updating Profile...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        Update Profile
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
