"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, GraduationCap, MessageCircle } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <GraduationCap className="h-6 w-6" />
          <span className="sr-only">Educational Equity Platform</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">Empower Your Future with Mentorship and Resources</h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">Access free tutoring, mentorship, and scholarships to unlock your potential.</p>
              </div>
              <div className="space-x-4">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Our Core Features</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-6 h-6 mr-2" />
                    Virtual Tutoring
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Get one-on-one help from expert tutors in various subjects.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-6 h-6 mr-2" />
                    Mentorship
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Connect with experienced mentors for guidance and support.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="w-6 h-6 mr-2" />
                    Scholarships
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Discover and apply for scholarships tailored to your profile.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="w-6 h-6 mr-2" />
                    Community Forum
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Engage with peers, share knowledge, and collaborate on projects.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Success Stories</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Alex Johnson",
                  story: "Thanks to the mentorship program, I got into my dream college!"
                },
                {
                  name: "Maria Garcia",
                  story: "The tutoring sessions helped me improve my grades significantly."
                },
                {
                  name: "Jamal Williams",
                  story: "I found a scholarship through the platform that's funding my education."
                }
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="mt-4">
                    <p className="text-gray-600 mb-2">"{testimonial.story}"</p>
                    <p className="font-semibold">{testimonial.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">©️ 2024 Educational Equity Platform. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
