"use client"

import { useState } from "react"
import a from "../assets/2.png"
import b from "../assets/3.png"
import c from "../assets/4.png"
import d from "../assets/5.png"
import e from "../assets/6.png"
import f from "../assets/7.png"
import LoginModal from "../components/LoginModal"
import SignupModal from "../components/SignupModal"

const hackathons = {
  ongoing: [
    {
      title: "AI Innovation Challenge",
      description: "Create powerful AI solutions for real-world problems",
      time: "7 days left",
      participants: "1.2k participants",
      tag: "Live",
      image: a,
    },
    {
      title: "Web3 Development",
      description: "Build the future of decentralized web",
      time: "12 days left",
      participants: "950 participants",
      tag: "Live",
      image: b,
    },
    {
      title: "Green Tech Summit",
      description: "Innovate for a sustainable future",
      time: "5 days left",
      participants: "840 participants",
      tag: "Live",
      image: c,
    },
  ],
  upcoming: [
    {
      title: "Cloud Computing Challenge",
      description: "Explore solutions using cloud technology",
      start: "Starts in 2 weeks",
      tag: "Coming Soon",
      image: d,
    },
    {
      title: "Mobile App Innovation",
      description: "Create apps on mobile ecosystems",
      start: "Starts in 3 weeks",
      tag: "Coming Soon",
      image: e,
    },
    {
      title: "Security Hackathon",
      description: "Tackle modern cybersecurity challenges",
      start: "Starts in 1 month",
      tag: "Upcoming",
      image: f,
    },
  ],
}

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
      <div className="font-sans">
        <div className="text-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-16">
          <h1 className="text-4xl font-bold mb-4">Discover Amazing Hackathons</h1>
          <p className="mb-6">Join the largest community of developers and innovators</p>
          <div className="space-x-4">
            <button
              onClick={handleGetStartedClick}
              className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </button>
            <button
              onClick={handleHackathonClick}
              className="bg-indigo-700 px-6 py-2 rounded-full font-semibold hover:bg-indigo-800 transition-colors"
            >
              Browse Hackathons
            </button>
          </div>
        </div>

        <section className="px-6 py-12 max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Ongoing Hackathons</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {hackathons.ongoing.map((hack, index) => (
              <div
                key={index}
                onClick={handleHackathonClick}
                className="bg-white shadow rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
              >
                <img src={hack.image || "/placeholder.svg"} alt={hack.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{hack.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{hack.description}</p>
                  <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                    <span>{hack.time}</span>
                    <span>{hack.participants}</span>
                  </div>
                  <span className="mt-2 inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                    {hack.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 py-12 max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Upcoming Hackathons</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {hackathons.upcoming.map((hack, index) => (
              <div
                key={index}
                onClick={handleHackathonClick}
                className="bg-white shadow rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
              >
                <img src={hack.image || "/placeholder.svg"} alt={hack.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{hack.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{hack.description}</p>
                  <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                    <span>{hack.start}</span>
                  </div>
                  <span className="mt-2 inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                    {hack.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

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

        <div className="text-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-12">
          <h2 className="text-2xl font-semibold mb-4">Ready to Start Your Hackathon Journey?</h2>
          <button
            onClick={handleJoinClick}
            className="bg-white text-purple-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Join HackVerse Today
          </button>
        </div>
      </div>

      {/* Modals */}
      <LoginModal isOpen={isLoginOpen} onClose={handleCloseLogin} onSwitchToSignup={handleSwitchToSignup} />

      <SignupModal isOpen={isSignupOpen} onClose={handleCloseSignup} onSwitchToLogin={handleSwitchToLogin} />
    </>
  )
}
