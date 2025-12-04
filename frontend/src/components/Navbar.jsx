"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/Frame.png";

const NavbarH = ({ onLoginClick, onSignupClick }) => {
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <motion.nav
      className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#f0f4ff] to-[#e8ecfc] px-8 py-4 flex justify-between items-center border-b border-purple-200"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo Section */}
      <motion.div
        className="flex items-center space-x-3 cursor-pointer group"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.div
          className="relative"
          animate={{ rotateZ: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={logo} alt="logo" className="h-8 w-8 rounded-lg" />
        </motion.div>
        <motion.span
          className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Hackverse
        </motion.span>
      </motion.div>

      {/* Right Buttons */}
      <motion.div
        className="flex items-center space-x-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Log In Button */}
        <motion.button
          onClick={onLoginClick}
          onMouseEnter={() => setHoveredButton("login")}
          onMouseLeave={() => setHoveredButton(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-6 py-2 text-sm font-medium text-purple-600 border border-purple-400 rounded-lg transition-all duration-300 hover:bg-purple-50"
        >
          Log In
        </motion.button>

        {/* Sign Up Button */}
        <motion.button
          onClick={onSignupClick}
          onMouseEnter={() => setHoveredButton("signup")}
          onMouseLeave={() => setHoveredButton(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-300/50"
        >
          {/* Hover shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
            animate={
              hoveredButton === "signup"
                ? { x: ["-100%", "100%"], opacity: [0, 0.2, 0] }
                : { x: "-100%" }
            }
            transition={{
              duration: 0.6,
              repeat: hoveredButton === "signup" ? Infinity : 0,
            }}
          />
          <span className="relative">Sign Up</span>
        </motion.button>
      </motion.div>
    </motion.nav>
  );
};

export default NavbarH;
