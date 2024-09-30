"use client"

import React from "react"
// import { Button, Card } from "shadcn/ui" // Assumed shadcn/ui component library
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { BookOpen, Users, Gift } from "lucide-react" // Icons from Lucide React for visual appeal

const VidyaSaathiLandingPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">VidyaSaathi</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-800 hover:text-blue-600">
              Features
            </a>
            <a href="#testimonials" className="text-gray-800 hover:text-blue-600">
              Success Stories
            </a>
            <a href="#contact" className="text-gray-800 hover:text-blue-600">
              Contact
            </a>
            <Button>Sign Up</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Empowering Students with Access to Education</h2>
          <p className="text-lg mb-8">Join VidyaSaathi today and connect with mentors, access virtual tutoring, and discover scholarship opportunities.</p>
          <div className="space-x-4">
            <Button className="bg-white text-blue-600 px-6 py-3">Get Started</Button>
            <Button className="bg-transparent border-white text-white px-6 py-3">Learn More</Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose VidyaSaathi?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-white shadow-lg">
              <div className="flex justify-center mb-4">
                <Users className="text-blue-600 w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Mentorship</h3>
              <p className="text-gray-600 text-center">Get paired with experienced mentors who guide and support your academic journey.</p>
            </Card>

            <Card className="p-6 bg-white shadow-lg">
              <div className="flex justify-center mb-4">
                <BookOpen className="text-blue-600 w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Virtual Tutoring</h3>
              <p className="text-gray-600 text-center">Attend live tutoring sessions or access recorded lessons, customized for your learning needs.</p>
            </Card>

            <Card className="p-6 bg-white shadow-lg">
              <div className="flex justify-center mb-4">
                <Gift className="text-blue-600 w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Scholarship Opportunities</h3>
              <p className="text-gray-600 text-center">Explore a wide range of scholarships to help fund your education and break financial barriers.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="testimonials" className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 shadow-lg">
              <p className="text-gray-600 italic mb-4">"VidyaSaathi helped me find a mentor who guided me through the scholarship application process, and now I'm studying at my dream university!"</p>
              <p className="text-gray-900 font-bold text-right">- Radhika, Delhi</p>
            </div>
            <div className="bg-white p-6 shadow-lg">
              <p className="text-gray-600 italic mb-4">"The virtual tutoring sessions were a game-changer for me. I struggled with math, but the one-on-one support made a huge difference."</p>
              <p className="text-gray-900 font-bold text-right">- Aarav, Mumbai</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-4">©️ 2024 VidyaSaathi. All Rights Reserved.</p>
          <nav className="flex justify-center space-x-6">
            <a href="#privacy" className="hover:text-gray-200">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-gray-200">
              Terms of Service
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default VidyaSaathiLandingPage
