"use client"

import { useState } from "react"
import LoginModal from "../components/LoginModal"
import SignupModal from "../components/SignupModal"


export default function HackathonPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)

  const handleGetStartedClick = () => {
    setIsSignupOpen(true)
  }

  const handleJoinClick = () => {
    setIsSignupOpen(true)
  }

  const handleHackathonClick = () => {
    setIsLoginOpen(true)
  }

  const handleCloseLogin = () => {
    setIsLoginOpen(false)
  }

  const handleCloseSignup = () => {
    setIsSignupOpen(false)
  }

  const handleSwitchToSignup = () => {
    setIsSignupOpen(true)
  }

  const handleSwitchToLogin = () => {
    setIsLoginOpen(true)
  }

  return (
    <>

      <div className="font-sans bg-gradient-to-br from-[#f0f4ff] to-[#e8ecfc]">
      

        <section className="bg-gray-100 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-6">Why Choose HackVerse?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-indigo-500 text-4xl mb-2">🎁</div>
                <h4 className="font-bold">Amazing Prizes</h4>
                <p className="text-sm text-gray-600 mt-2">
                  Win exciting prizes and get recognized for your creativity and innovation.
                </p>
              </div>
              <div>
                <div className="text-purple-500 text-4xl mb-2">🌍</div>
                <h4 className="font-bold">Global Community</h4>
                <p className="text-sm text-gray-600 mt-2">Connect with developers and innovators worldwide.</p>
              </div>
              <div>
                <div className="text-blue-500 text-4xl mb-2">🚀</div>
                <h4 className="font-bold">Launch Your Career</h4>
                <p className="text-sm text-gray-600 mt-2">
                  Gain visibility for top tech companies and startups worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

     
      </div>

      {/* Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={handleCloseLogin} onSwitchToSignup={handleSwitchToSignup} />

      <SignupModal isOpen={isSignupOpen} onClose={handleCloseSignup} onSwitchToLogin={handleSwitchToLogin} />
    </>
  )
}
