"use client"
import logo from "../assets/Frame.png"
const NavbarH = ({ onLoginClick, onSignupClick }) => {
  return (
    <nav className="w-full shadow-md bg-white px-8 py-3 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="logo" className="h-6 w-6" />
        <span className="text-lg font-semibold">Hackverse</span>
      </div>

      {/* Right Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={onLoginClick}
          className="px-4 py-1 border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-100 text-sm bg-white transition-colors"
        >
          Log In
        </button>
        <button
          onClick={onSignupClick}
          className="px-4 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm transition-colors"
        >
          Sign Up
        </button>
      </div>
    </nav>
  )
}

export default NavbarH
