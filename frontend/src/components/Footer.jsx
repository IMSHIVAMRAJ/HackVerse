import { Heart, Code, Users, Zap } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-gray-800 font-bold text-2xl">Hackverse</span>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg max-w-md">
              Empowering developers, designers, and innovators to find their perfect hackathon teammates. Building the
              future of collaborative innovation, one team at a time.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-purple-600">
                <Users className="w-5 h-5" />
                <span className="font-semibold">10,000+ Users</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">500+ Teams Formed</span>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="space-y-4">
            <h3 className="text-gray-800 font-bold text-lg">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To democratize hackathon participation by connecting talented individuals and fostering innovation through
              seamless team collaboration.
            </p>
          </div>

          {/* Values */}
          <div className="space-y-4">
            <h3 className="text-gray-800 font-bold text-lg">Our Values</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600">Innovation First</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Inclusive Community</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-gray-600">Seamless Experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-gray-600">Global Impact</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-gray-600">
              <div className="text-sm">© {new Date().getFullYear()} Hackverse. All rights reserved.</div>
              <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="text-sm">Made for hackers, by hackers</div>
            </div>

            {/* Credits */}
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <span>Crafted with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                <span>and</span>
                <Code className="w-4 h-4 text-purple-500" />
                <span>by</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-purple-600 font-semibold text-sm">Shivam Raj</div>
                  <div className="text-gray-500 text-xs">Lead Developer</div>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div className="text-center">
                
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-gray-500 text-sm">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
              <span>Connecting innovators worldwide</span>
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
