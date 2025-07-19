"use client"

import { useState, useEffect } from "react"
import { User, LogOut, Menu, X } from "lucide-react"
import { isAuthenticated, removeAuthToken, getAuthToken } from "../utils/auth"
import LoginModal from "./LoginModal"
import logo from "../assets/Frame.png"
import { useNavigate } from "react-router-dom"

const Navbar = ({ onLoginClick, onSignupClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated())
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [userProfile, setUserProfile] = useState({ name: "", profilePic: "" })

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isLoggedIn) {
        try {
          const token = getAuthToken()
          if (!token) return

          const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/user/profile`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })

          if (response.ok) {
            const data = await response.json()
            const profile = data.user || data.profile || data
            setUserProfile({
              name: profile.name || "",
              profilePic: profile.profilePic || "",
            })
          }
        } catch (error) {
          console.error("Error fetching user profile:", error)
        }
      }
    }

    fetchUserProfile()
  }, [isLoggedIn])

  const handleNavigation = (path) => {
    navigate(path)
    setIsMobileMenuOpen(false) // close mobile menu after navigation
  }

  const handleLogout = () => {
    removeAuthToken()
    setIsLoggedIn(false)
    setIsDropdownOpen(false)
    setUserProfile({ name: "", profilePic: "" })
    navigate("/")
  }

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true)
    setIsLoginModalOpen(false)
    if (userData.user) {
      setUserProfile({
        name: userData.user.name || "",
        profilePic: userData.user.profilePic || "",
      })
    }
  }

  const handleLoginClick = () => {
    if (onLoginClick) onLoginClick()
    else setIsLoginModalOpen(true)
  }

  const handleSignupClick = () => {
    if (onSignupClick) onSignupClick()
  }

  const getUserInitials = () => {
    if (!userProfile.name) return "U"
    return userProfile.name
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <>
      <nav className="px-6 py-2 bg-gradient-to-r from-[#818CF8] via-[#818CF8] to-[#B47DFA] text-white backdrop-blur-sm sticky top-0 z-50 border-b border-white/10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo || "/placeholder.svg"} alt="logo" className="h-6 w-6" />
            <button
              onClick={() => handleNavigation("/dashboard")}
              className="text-lg font-semibold hover:text-purple-300 transition-colors"
            >
              Hackverse
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {isLoggedIn && (
              <>
                <button onClick={() => handleNavigation("/dashboard")} className="hover:text-purple-200 transition-colors text-m font-medium">Home</button>
                <button onClick={() => handleNavigation("/teams")} className="hover:text-purple-200 transition-colors text-m font-medium">Teams</button>
                <button onClick={() => handleNavigation("/requirements")} className="hover:text-purple-200 transition-colors text-m font-medium">My Requirements</button>
              </>
            )}
          </div>

          {/* Right Side (Buttons or Avatar) */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-purple-200 hover:border-purple-400 transition-colors"
                >
                  {userProfile.profilePic ? (
                    <img src={userProfile.profilePic} alt="profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-purple-600 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">{getUserInitials()}</span>
                    </div>
                  )}
                </button>

                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                      <div className="py-1">
                        <div className="px-4 py-3 border-b border-gray-200">
                          <p className="text-sm font-medium text-gray-900">{userProfile.name || "User"}</p>
                          <p className="text-xs text-gray-500">Manage your account</p>
                        </div>
                        <button onClick={() => { handleNavigation("/profile"); setIsDropdownOpen(false) }} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><User className="mr-3 h-4 w-4" />My Profile</button>
                        <hr className="my-1" />
                        <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"><LogOut className="mr-3 h-4 w-4" />Log out</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <button onClick={handleLoginClick} className="px-4 py-1 border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-100 text-sm bg-white transition-colors">Log In</button>
                <button onClick={handleSignupClick} className="px-4 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm transition-colors">Sign Up</button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Nav Links (when open) */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            {isLoggedIn ? (
              <>
                <button onClick={() => handleNavigation("/dashboard")} className="block w-full text-left px-4 py-2 text-white hover:bg-purple-500 rounded-md">Home</button>
                <button onClick={() => handleNavigation("/teams")} className="block w-full text-left px-4 py-2 text-white hover:bg-purple-500 rounded-md">Teams</button>
                <button onClick={() => handleNavigation("/requirements")} className="block w-full text-left px-4 py-2 text-white hover:bg-purple-500 rounded-md">Requirements</button>
                <button onClick={() => handleNavigation("/profile")} className="block w-full text-left px-4 py-2 text-white hover:bg-purple-500 rounded-md">My Profile</button>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-200 hover:bg-red-500 hover:text-white rounded-md">Log out</button>
              </>
            ) : (
              <>
                <button onClick={handleLoginClick} className="block w-full text-left px-4 py-2 bg-white text-purple-600 rounded-md hover:bg-purple-100">Log In</button>
                <button onClick={handleSignupClick} className="block w-full text-left px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800">Sign Up</button>
              </>
            )}
          </div>
        )}
      </nav>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLoginSuccess={handleLoginSuccess} />
    </>
  )
}

export default Navbar
