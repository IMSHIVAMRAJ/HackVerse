"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Users,
  Clock,
  FileText,
  Shield,
  MessageCircle,
  Search,
  Sparkles,
  Rocket,
  ArrowRight,
} from "lucide-react";
import Footer from "../components/Footer";
import h1 from "../assets/h1.jpg";
import h2 from "../assets/h2.png";
import h3 from "../assets/h3.jpeg";
import h4 from "../assets/h5.jpeg";
import HackathonPage from "./Hackathon";

const successStories = [
  {
    id: 1,
    name: "Team CodeCrafters",
    hackathon: "TechHack 2024",
    achievement: "🏆 1st Place Winner",
    story:
      "Found the perfect team through Hackverse and built an AI-powered healthcare app that won first place!",
    members: ["Alex Chen", "Sarah Kim", "Mike Johnson"],
    prize: "$10,000",
    image: h1,
  },
  {
    id: 2,
    name: "InnovatorsX",
    hackathon: "StartupWeekend",
    achievement: "💡 Best Innovation Award",
    story:
      "Connected with amazing developers and designers to create a sustainable energy solution.",
    members: ["Emma Davis", "Ryan Park", "Lisa Wang"],
    prize: "$5,000",
    image: h2,
  },
  {
    id: 3,
    name: "DataDrivers",
    hackathon: "MLHacks Global",
    achievement: "❤️ People's Choice",
    story:
      "Used Hackverse to find ML experts and built a revolutionary data visualization platform.",
    members: ["John Smith", "Priya Patel", "Carlos Rodriguez"],
    prize: "$3,000",
    image: h3,
  },
  {
    id: 4,
    name: "WebWizards",
    hackathon: "DevFest 2024",
    achievement: "🎨 Best UI/UX",
    story:
      "Matched with talented designers through smart team matching and created an award-winning interface.",
    members: ["Sophie Turner", "David Lee", "Anna Martinez"],
    prize: "$2,500",
    image: h4,
  },
];

export default function FeaturesPage() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStoryIndex((prev) => (prev + 1) % successStories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Users,
      title: "Smart team matching based on skills",
      description:
        "Our AI-powered algorithm matches you with teammates who complement your skills perfectly.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Real-time join requests",
      description:
        "Get instant notifications when someone wants to join your team or when you're invited.",
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: FileText,
      title: "Team requirement board",
      description:
        "Post your team needs and browse available opportunities in one centralized place.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Shield,
      title: "Secure & verified user profiles",
      description:
        "All profiles are verified to ensure you're connecting with genuine hackathon participants.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: MessageCircle,
      title: "Integrated chat system",
      description:
        "Communicate seamlessly with your team members through our built-in messaging platform.",
      color: "from-pink-500 to-purple-500",
      comingSoon: true,
    },
  ];

  const steps = [
    {
      icon: Search,
      title: "Browse or create a team",
      description:
        "Explore existing teams looking for members or create your own team posting.",
      color: "from-purple-500 to-blue-500",
    },
    {
      icon: Sparkles,
      title: "Fill profile & skills",
      description:
        "Complete your profile with your skills, experience, and hackathon preferences.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: Rocket,
      title: "Join hackathons with your dream team",
      description:
        "Get matched with the perfect teammates and dominate your next hackathon!",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="relative bg-gradient-to-br from-[#f0f4ff] to-[#e8ecfc] min-h-screen">
      {/* Animated Background Layer */}
      <div className="fixed inset-0 -z-50 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,.1)_1px,transparent_1px)] bg-[length:50px_50px] animate-grid-move" />
        </div>

        {/* Animated Blobs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
          animate={{ x: [0, 50, -50, 0], y: [0, 50, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"
          animate={{ x: [0, -50, 50, 0], y: [0, -50, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"
          animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ⭐ STICKER 1: Network Node - Top Left - HIDDEN ON MOBILE */}
        <motion.div
          className="hidden lg:block absolute top-8 left-8 group"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-transparent rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
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

        {/* ⭐ STICKER 2: Shield/Security - Bottom Right - HIDDEN ON MOBILE */}
        <motion.div
          className="hidden lg:block absolute bottom-12 right-8 group"
          animate={{ rotate: -360, scale: [1, 1.15, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-transparent rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
            <svg
              className="w-full h-full text-blue-400"
              viewBox="0 0 80 80"
              fill="none"
            >
              <path
                d="M 40 10 L 60 20 L 60 40 C 60 55 40 70 40 70 C 40 70 20 55 20 40 L 20 20 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.8"
              />
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
              <path
                d="M 36 35 Q 36 25 40 25 Q 44 25 44 35"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.6"
              />
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

        {/* ⭐ STICKER 3: Code/Terminal - Top Right - HIDDEN ON MOBILE */}
        <motion.div
          className="hidden lg:block absolute top-16 right-12 group"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-300 via-blue-300 to-transparent rounded-lg blur opacity-15 group-hover:opacity-30 transition-opacity" />
            <div className="relative bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-lg shadow-lg p-2 w-32">
              <div className="flex gap-1 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-400/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                <div className="w-2 h-2 rounded-full bg-green-400/60" />
              </div>
              <div className="font-mono text-xs text-purple-600 space-y-0.5">
                <div>$ npm run hack</div>
                <div className="text-blue-500">❯ Building team...</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ⭐ STICKER 4: Puzzle/Collaboration - Bottom Left - HIDDEN ON MOBILE */}
        <motion.div
          className="hidden lg:block absolute bottom-16 left-12 group"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity" />
            <svg
              className="w-16 h-16 text-pink-400"
              viewBox="0 0 80 80"
              fill="none"
            >
              <path
                d="M 40 15 L 50 25 L 50 40 Q 50 50 40 55 Q 30 50 30 40 L 30 25 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.8"
                fill="currentColor"
                fillOpacity="0.1"
              />
              <circle cx="40" cy="32" r="2" fill="currentColor" opacity="0.8" />
              <path
                d="M 25 45 Q 20 45 20 50 Q 20 55 25 55 Q 30 55 30 50 Q 30 45 25 45"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.6"
                fill="currentColor"
                fillOpacity="0.05"
              />
              <path
                d="M 55 45 Q 50 45 50 50 Q 50 55 55 55 Q 60 55 60 50 Q 60 45 55 45"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.6"
                fill="currentColor"
                fillOpacity="0.05"
              />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Why Choose Hackverse?
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover the powerful features that make Hackverse the ultimate
            platform for hackathon team building and collaboration
          </motion.p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:-translate-y-2 h-full relative overflow-hidden">
                  {/* Gradient border on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                    animate={{
                      backgroundPosition: ["0% 0%", "200% 0%", "0% 0%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <motion.div
                        className={`bg-gradient-to-r ${feature.color} p-4 rounded-2xl shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                          <h3 className="font-bold text-gray-800 text-lg leading-tight">
                            {feature.title}
                          </h3>
                          {feature.comingSoon && (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold">
                              Coming Soon
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              See how teams built through Hackverse are winning hackathons
              worldwide and achieving their dreams
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              className="overflow-hidden rounded-3xl shadow-2xl"
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentStoryIndex * 100}%)`,
                }}
              >
                {successStories.map((story) => (
                  <motion.div key={story.id} className="w-full flex-shrink-0">
                    <Card className="bg-white border-0 rounded-none">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <motion.div
                            className="w-full md:w-1/2 p-6 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-[#f0f4ff] to-[#e8ecfc]"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                          >
                            <div className="space-y-6">
                              <div className="flex items-center justify-between flex-wrap">
                                <div>
                                  <motion.h3
                                    className="text-3xl font-bold text-gray-800 mb-2"
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    {story.name}
                                  </motion.h3>
                                  <p className="text-purple-600 font-semibold">
                                    {story.hackathon}
                                  </p>
                                </div>
                                <motion.div
                                  className="text-right"
                                  initial={{ scale: 0 }}
                                  whileInView={{ scale: 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 200,
                                  }}
                                >
                                  <div className="text-2xl mb-2">
                                    {story.achievement}
                                  </div>
                                  <div className="text-3xl font-bold text-green-600">
                                    {story.prize}
                                  </div>
                                </motion.div>
                              </div>

                              <blockquote className="text-lg text-gray-700 italic leading-relaxed border-l-4 border-purple-500 pl-6">
                                "{story.story}"
                              </blockquote>

                              <div>
                                <p className="text-sm font-semibold text-gray-500 mb-3">
                                  TEAM MEMBERS
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {story.members.map((member, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ opacity: 0, y: 10 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      transition={{ delay: idx * 0.1 }}
                                    >
                                      <Badge
                                        variant="outline"
                                        className="border-purple-200 text-purple-700 bg-purple-50"
                                      >
                                        {member}
                                      </Badge>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>

                          <motion.div
                            className="w-full md:w-1/2 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-6 lg:p-8"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                          >
                            <motion.img
                              src={story.image || "/placeholder.svg"}
                              alt={`${story.name} team`}
                              className="rounded-2xl shadow-lg max-w-full h-auto object-cover"
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            />
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-3">
              {successStories.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentStoryIndex
                      ? "bg-purple-600 scale-125"
                      : "bg-purple-200 hover:bg-purple-300"
                  }`}
                  onClick={() => setCurrentStoryIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Get started with Hackverse in just 3 simple steps and find your
              perfect hackathon team
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 lg:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:-translate-y-2 h-full relative overflow-hidden">
                  {/* Gradient border animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                    animate={{
                      backgroundPosition: ["0% 0%", "200% 0%", "0% 0%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  <CardContent className="p-8 text-center h-full flex flex-col">
                    <motion.div
                      className={`bg-gradient-to-r ${step.color} w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                    >
                      <step.icon className="w-10 h-10 text-white" />
                    </motion.div>
                    <motion.div
                      className="bg-gradient-to-r from-purple-600 to-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <span className="text-white font-bold text-lg">
                        {index + 1}
                      </span>
                    </motion.div>
                    <motion.h3
                      className="text-2xl font-bold text-gray-800 mb-4 leading-tight"
                      whileHover={{ scale: 1.05 }}
                    >
                      {step.title}
                    </motion.h3>
                    <p className="text-gray-600 leading-relaxed flex-grow">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <div className="relative z-10">
        <HackathonPage />
        <Footer />
      </div>
    </div>
  );
}
