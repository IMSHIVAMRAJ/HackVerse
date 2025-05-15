import React from 'react';
import one from '../assets/1.png'
import Navbar from '../components/Navbar';

const Home1 = () => {
  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#e8ecfc] px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left Section - Text Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Find Your Perfect <br /> Hackathon Team
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Hackverse is your one-stop solution to discover hackathons and connect with talented teammates. Join the community of innovators!
          </p>
          <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300">
            Get Started
          </button>
        </div>

        {/* Right Section - Image */}
        <div className="flex justify-center">
          <img 
            src={one} 
            alt="Hackathon Team" 
            className="w-full max-w-md md:max-w-lg  rounded-xl"
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default Home1;
