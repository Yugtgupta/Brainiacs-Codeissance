import React, { useState } from "react";

export default function HomePage() {
  const [hoverButton, setHoverButton] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-500 text-white overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-100px] left-[150px] w-[500px] h-[500px] rounded-full bg-purple-300 opacity-30 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-150px] right-[200px] w-[600px] h-[600px] rounded-full bg-indigo-300 opacity-30 blur-3xl animate-pulse delay-1500" />
      </div>

      {/* Navbar */}
      <nav className="flex justify-between items-center p-6">
        <h1 className="text-4xl font-bold">VidyaSaathi</h1>
        <ul className="flex space-x-8 text-lg">
          <li className="hover:text-yellow-400 cursor-pointer transition-colors">Home</li>
          <li className="hover:text-yellow-400 cursor-pointer transition-colors">About</li>
          <li className="hover:text-yellow-400 cursor-pointer transition-colors">Services</li>
          <li className="hover:text-yellow-400 cursor-pointer transition-colors">Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-[75vh] space-y-8 text-center">
        <h2 className="text-5xl font-extrabold leading-tight animate-fadeInUp">Empower Your Learning Journey</h2>
        <p className="max-w-xl text-lg text-white/80 animate-fadeInUp delay-300">Connect with top mentors, attend virtual classes, and access scholarship opportunities with ease.</p>
        <button
          className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out"
        >
          Get Started
        </button>
      </div>

      {/* Floating Dots for extra effect */}
      <div className="absolute w-20 h-20 bg-yellow-400 rounded-full top-32 right-32 opacity-80 blur-sm animate-bounce" />
      <div className="absolute w-16 h-16 bg-blue-300 rounded-full bottom-28 left-40 opacity-80 blur-sm animate-bounce delay-2000" />

      {/* Divider with smooth gradient transition */}
      <div className="relative w-full h-20 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-500"></div>

      {/* Vision Statement Section */}
      <div className="relative min-h-[70svh] w-full bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-500 text-white py-12 mt-[-20px]">
        <div className="absolute top-[-100px] left-[50px] w-[300px] h-[300px] rounded-full bg-white opacity-10 blur-3xl" />
        <h3 className="text-4xl font-bold text-center mb-8">Our Vision</h3>
        <p className="max-w-2xl mx-auto text-lg text-center px-4">
          At VidyaSaathi, we envision a world where quality education is accessible to all. Our platform connects students with exceptional mentors, providing the tools and resources needed to enhance learning experiences and achieve academic success.
        </p>
      </div>

      {/* Core Features Section */}
      <div className="relative w-full bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-500 text-white py-12 mt-[-20px]">
        <h3 className="text-4xl font-bold text-center mb-12">Our Core Features</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-10 lg:px-20">
          {/* Virtual Tutoring */}
          <div className="p-6 bg-white text-indigo-600 rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300 ease-in-out">
            <h4 className="text-2xl font-bold mb-4">Virtual Tutoring</h4>
            <p className="text-lg">Join live tutoring sessions or access recorded lectures tailored to your needs.</p>
          </div>
          
          {/* Mentorship */}
          <div className="p-6 bg-white text-indigo-600 rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300 ease-in-out">
            <h4 className="text-2xl font-bold mb-4">Mentorship</h4>
            <p className="text-lg">Get guidance from experienced mentors to accelerate your learning journey.</p>
          </div>
          
          {/* Scholarships */}
          <div className="p-6 bg-white text-indigo-600 rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300 ease-in-out">
            <h4 className="text-2xl font-bold mb-4">Scholarships</h4>
            <p className="text-lg">Access a wide range of scholarships designed to support your education.</p>
          </div>
          
          {/* Community Forum */}
          <div className="p-6 bg-white text-indigo-600 rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300 ease-in-out">
            <h4 className="text-2xl font-bold mb-4">Community Forum</h4>
            <p className="text-lg">Engage with peers and mentors in our community to share knowledge and ideas.</p>
          </div>
        </div>
      </div>

      {/* Additional Section */}
      <div className="relative mt-20 min-h-[70svh] w-full bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-500 text-white py-12">
        <div className="absolute bottom-[-100px] right-[50px] w-[300px] h-[300px] rounded-full bg-white opacity-10 blur-3xl" />
        <h3 className="text-4xl font-bold text-center mb-8">Join Us Today</h3>
        <p className="max-w-2xl mx-auto text-lg text-center px-4 mb-8">
          Become a part of our thriving community and unlock your potential with personalized learning paths, expert guidance, and collaborative opportunities.
        </p>
        <div className="flex justify-center">
          <button className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
            Sign Up Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full p-4 text-center text-white/80">
        © 2024 VidyaSaathi. All Rights Reserved.
      </footer>
    </div>
  );
}
