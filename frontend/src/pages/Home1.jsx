"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import one from "../assets/1.png";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import NavbarH from "../components/Navbar";
import FeaturesPage from "./Features";

const Home1 = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <>
      <NavbarH
        onLoginClick={() => setIsLoginOpen(true)}
        onSignupClick={() => setIsSignupOpen(true)}
      />

      {/* 🌌 Animated Background with Tech Theme */}
      <div className="fixed inset-0 -z-50 overflow-hidden bg-gradient-to-br from-[#f0f4ff] to-[#e8ecfc]">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,.1)_1px,transparent_1px)] bg-[length:50px_50px] animate-grid-move" />
        </div>

        {/* ⭐ STICKER 1: Network Node - Top Left - HIDDEN ON MOBILE */}
        <motion.div
          className="hidden lg:block absolute top-8 left-8 group"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative w-20 h-20">
            {/* Glow background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-transparent rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
            {/* Main circle */}
            <svg
              className="w-full h-full text-purple-400"
              viewBox="0 0 80 80"
              fill="none"
            >
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.6"
              />
              <circle
                cx="40"
                cy="40"
                r="24"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.4"
              />
              <circle
                cx="40"
                cy="40"
                r="16"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.3"
              />
              {/* Nodes */}
              <circle cx="40" cy="40" r="4" fill="currentColor" opacity="0.8" />
              <circle
                cx="40"
                cy="10"
                r="2.5"
                fill="currentColor"
                opacity="0.6"
              />
              <circle
                cx="65"
                cy="40"
                r="2.5"
                fill="currentColor"
                opacity="0.6"
              />
              <circle
                cx="40"
                cy="70"
                r="2.5"
                fill="currentColor"
                opacity="0.6"
              />
              <circle
                cx="15"
                cy="40"
                r="2.5"
                fill="currentColor"
                opacity="0.6"
              />
              {/* Connecting lines */}
              <line
                x1="40"
                y1="40"
                x2="40"
                y2="10"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.3"
              />
              <line
                x1="40"
                y1="40"
                x2="65"
                y2="40"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.3"
              />
              <line
                x1="40"
                y1="40"
                x2="40"
                y2="70"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.3"
              />
              <line
                x1="40"
                y1="40"
                x2="15"
                y2="40"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.3"
              />
            </svg>
          </div>
        </motion.div>

        {/* ⭐ STICKER 2: Lock/Security Shield - Bottom Right - HIDDEN ON MOBILE */}
        <motion.div
          className="hidden lg:block absolute bottom-12 right-8 group"
          animate={{ rotate: -360, scale: [1, 1.15, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative w-20 h-20">
            {/* Glow background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-transparent rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
            {/* Security shield */}
            <svg
              className="w-full h-full text-blue-400"
              viewBox="0 0 80 80"
              fill="none"
            >
              {/* Shield outline */}
              <path
                d="M 40 10 L 60 20 L 60 40 C 60 55 40 70 40 70 C 40 70 20 55 20 40 L 20 20 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.8"
              />
              {/* Lock body */}
              <rect
                x="32"
                y="35"
                width="16"
                height="18"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.7"
              />
              {/* Lock shackle */}
              <path
                d="M 36 35 Q 36 25 40 25 Q 44 25 44 35"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.6"
              />
              {/* Lock dot */}
              <circle
                cx="40"
                cy="50"
                r="1.5"
                fill="currentColor"
                opacity="0.6"
              />
            </svg>
          </div>
        </motion.div>

        {/* ⭐ STICKER 3: Code Terminal - Top Right - HIDDEN ON MOBILE */}
        <motion.div
          className="hidden lg:block absolute top-16 right-12 group"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            {/* Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-300 via-blue-300 to-transparent rounded-lg blur opacity-15 group-hover:opacity-30 transition-opacity" />
            {/* Terminal window */}
            <div className="relative bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-lg shadow-lg p-2 w-32">
              {/* Header */}
              <div className="flex gap-1 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-400/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                <div className="w-2 h-2 rounded-full bg-green-400/60" />
              </div>
              {/* Code */}
              <div className="font-mono text-xs text-purple-600 space-y-0.5">
                <div>$ npm run hack</div>
                <div className="text-blue-500">❯ Building team...</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ⭐ STICKER 4: Puzzle Piece - Bottom Left - HIDDEN ON MOBILE */}
        <motion.div
          className="hidden lg:block absolute bottom-16 left-12 group"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-16 h-16">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-purple-300 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity" />
            {/* Puzzle piece */}
            <svg
              className="w-full h-full text-pink-400"
              viewBox="0 0 64 64"
              fill="none"
            >
              <path
                d="M 8 8 L 48 8 L 48 24 L 56 24 L 56 32 L 48 32 L 48 48 L 8 48 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="currentColor"
                opacity="0.3"
              />
              <rect
                x="8"
                y="8"
                width="40"
                height="40"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              {/* Notch */}
              <circle cx="52" cy="28" r="4" fill="currentColor" opacity="0.6" />
            </svg>
          </div>
        </motion.div>

        {/* ⭐ STICKER 5: Lightning Bolt - Top Center - HIDDEN ON MOBILE */}
        <motion.div
          className="hidden lg:block absolute top-24 left-1/3 group"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="relative">
            {/* Glow */}
            <div className="absolute -inset-1 bg-yellow-300 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity" />
            {/* Lightning */}
            <svg
              className="w-10 h-10 text-yellow-500"
              viewBox="0 0 40 40"
              fill="currentColor"
            >
              <path
                d="M 20 2 L 28 16 L 20 16 L 28 38 L 12 24 L 20 24 Z"
                opacity="0.7"
              />
            </svg>
          </div>
        </motion.div>

        {/* Connection Lines Animation */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.08 }}
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 100 200 Q 300 150 500 200"
            fill="none"
            stroke="rgb(168, 85, 247)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        {/* ⭐ STICKER 6: Rocket - Right Center - HIDDEN ON MOBILE */}
        <motion.div
          className="hidden lg:block absolute right-16 top-1/2 transform -translate-y-1/2 group"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-red-300 via-orange-300 to-transparent rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity" />
            <svg
              className="w-12 h-12 text-red-500"
              viewBox="0 0 48 48"
              fill="currentColor"
            >
              {/* Rocket body */}
              <path d="M 24 4 L 28 20 L 24 32 L 20 20 Z" opacity="0.7" />
              {/* Windows */}
              <circle cx="24" cy="14" r="2" fill="white" opacity="0.8" />
              <circle cx="24" cy="20" r="1.5" fill="white" opacity="0.6" />
              {/* Fins */}
              <path d="M 20 28 L 16 40 L 20 32 Z" opacity="0.6" />
              <path d="M 28 28 L 32 40 L 28 32 Z" opacity="0.6" />
              {/* Flames */}
              <path
                d="M 22 34 L 20 44 L 24 36 Z"
                fill="currentColor"
                opacity="0.4"
              />
              <path
                d="M 26 34 L 28 44 L 24 36 Z"
                fill="currentColor"
                opacity="0.4"
              />
            </svg>
          </div>
        </motion.div>

        {/* ⭐ STICKER 7: Gear/Settings - Bottom Center - HIDDEN ON MOBILE */}
        <motion.div
          className="hidden lg:block absolute bottom-24 left-1/2 transform -translate-x-1/2 group"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-300 to-blue-300 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity" />
            <svg
              className="w-full h-full text-cyan-500"
              viewBox="0 0 64 64"
              fill="currentColor"
            >
              <circle cx="32" cy="32" r="8" opacity="0.7" />
              {/* Teeth */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                const rad = (angle * Math.PI) / 180;
                const x1 = 32 + Math.cos(rad) * 12;
                const y1 = 32 + Math.sin(rad) * 12;
                const x2 = 32 + Math.cos(rad) * 20;
                const y2 = 32 + Math.sin(rad) * 20;
                return (
                  <g key={angle}>
                    <rect
                      x={x1 - 2}
                      y={y1 - 2}
                      width="4"
                      height="4"
                      opacity="0.6"
                    />
                  </g>
                );
              })}
              <circle
                cx="32"
                cy="32"
                r="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                opacity="0.5"
              />
            </svg>
          </div>
        </motion.div>

        {/* ⭐ STICKER 8: Chat/Message Bubble - Left Center - HIDDEN ON MOBILE */}
        <motion.div
          className="hidden lg:block absolute left-12 top-1/3 group"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-br from-green-300 to-emerald-300 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-xl shadow-lg p-3 w-28">
              <div className="flex flex-col gap-1.5">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-green-300 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-green-200 rounded-full" />
                </div>
                <div className="text-xs text-green-600 font-semibold">
                  Connecting...
                </div>
              </div>
              {/* Tail */}
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white/80 transform rotate-45" />
            </div>
          </div>
        </motion.div>

        {/* Subtle Animated Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-10 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000" />

        {/* Subtle Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: Math.random() * 0.3 + 0.1,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Subtle Mouse-following glow */}
        <motion.div
          className="pointer-events-none fixed w-96 h-96 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-0"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
            opacity: 0.05,
          }}
          transition={{ type: "tween", ease: "linear" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 🎯 Left Section - Text Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Cyber Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <div className="px-4 py-2 bg-gradient-to-r from-purple-200 to-blue-200 border border-purple-400/50 rounded-full text-purple-700 text-sm font-semibold backdrop-blur-sm">
                ▸ Welcome to HackVerse
              </div>
            </motion.div>

            {/* Main Heading - Restored Original Color with Animations */}
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
              variants={itemVariants}
            >
              Find Your Perfect <br />
              <span className="relative inline-block">
                <span className="animate-subtle-glow">Hackathon Team</span>
              </span>
            </motion.h1>

            {/* Description - Restored Original Color */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Hackverse is your one-stop solution to discover hackathons and
              connect with talented teammates. Join the community of innovators!
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex gap-4 pt-4">
              <motion.button
                onClick={() => setIsSignupOpen(true)}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(147, 51, 234, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
              >
                Get Started
              </motion.button>
              <motion.button
                onClick={() => setIsLoginOpen(true)}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(147, 51, 234, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-purple-600 text-purple-600 hover:bg-purple-100 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Login
              </motion.button>
            </motion.div>

            {/* Tech Stats */}
            <motion.div
              variants={itemVariants}
              className="flex gap-8 pt-8 border-t border-purple-300"
            >
              <div className="group">
                <motion.div
                  className="text-3xl font-bold text-purple-600 group-hover:text-purple-700"
                  whileHover={{ scale: 1.1 }}
                >
                  500+
                </motion.div>
                <div className="text-sm text-gray-600 group-hover:text-gray-700">
                  Hackathons
                </div>
              </div>
              <div className="group">
                <motion.div
                  className="text-3xl font-bold text-purple-600 group-hover:text-purple-700"
                  whileHover={{ scale: 1.1 }}
                >
                  10K+
                </motion.div>
                <div className="text-sm text-gray-600 group-hover:text-gray-700">
                  Members
                </div>
              </div>
              <div className="group">
                <motion.div
                  className="text-3xl font-bold text-purple-600 group-hover:text-purple-700"
                  whileHover={{ scale: 1.1 }}
                >
                  100+
                </motion.div>
                <div className="text-sm text-gray-600 group-hover:text-gray-700">
                  Teams
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* 🖼️ Right Section - Animated Image with Elegant Border */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center relative"
          >
            {/* Main Image Container */}
            <motion.div
              className="relative z-10"
              whileHover={{
                scale: 1.05,
                rotate: 1,
              }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {/* Animated Gradient Border */}
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 rounded-2xl animate-rotate-gradient p-[2px]">
                  <div className="absolute inset-[2px] bg-white rounded-2xl" />
                </div>

                {/* Image */}
                <img
                  src={one}
                  alt="Hackathon Team"
                  className="w-full max-w-md md:max-w-lg rounded-2xl relative z-10"
                />

                {/* Overlay Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-400/10 via-transparent to-blue-400/10 rounded-2xl pointer-events-none z-20" />
              </div>

              {/* Floating Tech Badges */}
              <motion.div
                className="absolute -top-8 -left-8 w-16 h-16 bg-white rounded-full shadow-lg border border-purple-200/50 flex items-center justify-center"
                animate={{ y: [0, -10, 0], rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <div className="text-xs font-semibold text-purple-600 text-center">
                  {"</>"}
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-8 -right-8 w-16 h-16 bg-white rounded-full shadow-lg border border-blue-200/50 flex items-center justify-center"
                animate={{ y: [0, 10, 0], rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <div className="text-xs font-semibold text-blue-600 text-center">
                  {"</>"}
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Code Elements */}
            <motion.div
              className="absolute top-10 left-5 text-purple-500/60 font-mono text-xs backdrop-blur-sm px-3 py-2 rounded border border-purple-400/30"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              const team = await
            </motion.div>
            <motion.div
              className="absolute bottom-10 right-5 text-purple-500/60 font-mono text-xs backdrop-blur-sm px-3 py-2 rounded border border-purple-400/30"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              hackverse.find()
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Hackathon Section */}
      <FeaturesPage />

      {/* Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignup={() => setIsSignupOpen(true)}
      />
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSwitchToLogin={() => setIsLoginOpen(true)}
      />
    </>
  );
};

export default Home1;
