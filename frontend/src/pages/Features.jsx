"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Users, Clock, FileText, Shield, MessageCircle, Search, Sparkles, Rocket, ArrowRight } from "lucide-react"
import Footer from "../components/Footer"
import h1 from "../assets/h1.jpg"
import h2 from "../assets/h2.png"
import h3 from "../assets/h3.jpeg"
import h4 from "../assets/h5.jpeg"

const successStories = [
  {
    id: 1,
    name: "Team CodeCrafters",
    hackathon: "TechHack 2024",
    achievement: "🏆 1st Place Winner",
    story: "Found the perfect team through Hackverse and built an AI-powered healthcare app that won first place!",
    members: ["Alex Chen", "Sarah Kim", "Mike Johnson"],
    prize: "$10,000",
    image: h1
  },
  {
    id: 2,
    name: "InnovatorsX",
    hackathon: "StartupWeekend",
    achievement: "💡 Best Innovation Award",
    story: "Connected with amazing developers and designers to create a sustainable energy solution.",
    members: ["Emma Davis", "Ryan Park", "Lisa Wang"],
    prize: "$5,000",
    image: h2,
  },
  {
    id: 3,
    name: "DataDrivers",
    hackathon: "MLHacks Global",
    achievement: "❤️ People's Choice",
    story: "Used Hackverse to find ML experts and built a revolutionary data visualization platform.",
    members: ["John Smith", "Priya Patel", "Carlos Rodriguez"],
    prize: "$3,000",
    image: h3,
  },
  {
    id: 4,
    name: "WebWizards",
    hackathon: "DevFest 2024",
    achievement: "🎨 Best UI/UX",
    story: "Matched with talented designers through smart team matching and created an award-winning interface.",
    members: ["Sophie Turner", "David Lee", "Anna Martinez"],
    prize: "$2,500",
    image: h4,
  },
]

export default function FeaturesPage() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStoryIndex((prev) => (prev + 1) % successStories.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Users,
      title: "Smart team matching based on skills",
      description: "Our AI-powered algorithm matches you with teammates who complement your skills perfectly.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Real-time join requests",
      description: "Get instant notifications when someone wants to join your team or when you're invited.",
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: FileText,
      title: "Team requirement board",
      description: "Post your team needs and browse available opportunities in one centralized place.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Shield,
      title: "Secure & verified user profiles",
      description: "All profiles are verified to ensure you're connecting with genuine hackathon participants.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: MessageCircle,
      title: "Integrated chat system",
      description: "Communicate seamlessly with your team members through our built-in messaging platform.",
      color: "from-pink-500 to-purple-500",
      comingSoon: true,
    },
  ]

  const steps = [
    {
      icon: Search,
      title: "Browse or create a team",
      description: "Explore existing teams looking for members or create your own team posting.",
      color: "from-purple-500 to-blue-500",
    },
    {
      icon: Sparkles,
      title: "Fill profile & skills",
      description: "Complete your profile with your skills, experience, and hackathon preferences.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: Rocket,
      title: "Join hackathons with your dream team",
      description: "Get matched with the perfect teammates and dominate your next hackathon!",
      color: "from-indigo-500 to-purple-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Navigation */}
      

      {/* Hero Section */}
      <section className="relative overflow-hidden">
       
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 pt-20 mt-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-6">
              Why Choose <span className="text-yellow-400">Hackverse?</span>
            </h1>
            <p className="text-xl text-black/90 max-w-3xl mx-auto leading-relaxed">
              Discover the powerful features that make Hackverse the ultimate platform for hackathon team building and
              collaboration
            </p>
          </div>
        </div>
 </section>

      {/* Features Section */}
      <section className="pt-6 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white shadow-lg hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div
                      className={`bg-gradient-to-r ${feature.color} p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        <h3 className="font-bold text-gray-800 text-lg leading-tight">{feature.title}</h3>
                        {feature.comingSoon && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold">
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-white-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Success <span className="text-purple-600">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how teams built through Hackverse are winning hackathons worldwide and achieving their dreams
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentStoryIndex * 100}%)` }}
              >
                {successStories.map((story) => (
                  <div key={story.id} className="w-full flex-shrink-0">
                    <Card className="bg-white border-0 rounded-none">
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-2 gap-0">
                          <div className="p-12 flex flex-col justify-center">
                            <div className="space-y-6">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{story.name}</h3>
                                  <p className="text-purple-600 font-semibold">{story.hackathon}</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl mb-2">{story.achievement}</div>
                                  <div className="text-3xl font-bold text-green-600">{story.prize}</div>
                                </div>
                              </div>

                              <blockquote className="text-lg text-gray-700 italic leading-relaxed border-l-4 border-purple-500 pl-6">
                                "{story.story}"
                              </blockquote>

                              <div>
                                <p className="text-sm font-semibold text-gray-500 mb-3">TEAM MEMBERS</p>
                                <div className="flex flex-wrap gap-2">
                                  {story.members.map((member, idx) => (
                                    <Badge
                                      key={idx}
                                      variant="outline"
                                      className="border-purple-200 text-purple-700 bg-purple-50"
                                    >
                                      {member}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-8">
                            <img
                              src={story.image || "/placeholder.svg"}
                              alt={`${story.name} team`}
                              className="rounded-2xl shadow-lg max-w-full h-auto"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-3">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentStoryIndex ? "bg-purple-600 scale-125" : "bg-purple-200 hover:bg-purple-300"
                  }`}
                  onClick={() => setCurrentStoryIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              How It <span className="text-purple-600">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with Hackverse in just 3 simple steps and find your perfect hackathon team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white shadow-lg hover:-translate-y-2 h-full">
                  <CardContent className="p-8 text-center h-full flex flex-col">
                    <div
                      className={`bg-gradient-to-r ${step.color} w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed flex-grow">{step.description}</p>
                  </CardContent>
                </Card>

                {/* Arrow between steps */}
               
              </div>
            ))}
          </div>

      
        </div>
      </section>

      {/* Footer CTA */}
      <Footer />
    </div>
  )
}


