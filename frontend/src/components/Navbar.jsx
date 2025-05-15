import React from 'react';
import icon from '../assets/Frame.png'

const Navbar = () => {
  return (
    <nav className="w-full shadow-md bg-white px-8 py-3 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src={icon} alt="logo" className="h-6 w-6" />
        <span className="text-lg font-semibold">Hackverse</span>
      </div>

      {/* Center Links */}
      <div className="hidden md:flex space-x-6 text-sm text-gray-700">
        <a href="#" className="hover:text-purple-600">Home</a>
        <a href="#" className="hover:text-purple-600">Team</a>
        <a href="#" className="hover:text-purple-600">Requirements</a>
        <a href="#" className="hover:text-purple-600">Me</a>
        <a href="#" className="hover:text-purple-600">About Us</a>
      </div>

      {/* Right Buttons */}
      <div className="flex space-x-3">
        <button className="px-4 py-1 border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-100 text-sm">
          Log In
        </button>
        <button className="px-4 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
