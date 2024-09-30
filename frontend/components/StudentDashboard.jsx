"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, BookOpen, Users, MessageSquare, Calendar as CalendarIcon, Bell, Award, Target, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function StudentDashboard() {
  const [greeting, setGreeting] = useState("")
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good Morning")
    else if (hour < 18) setGreeting("Good Afternoon")
    else setGreeting("Good Evening")
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <GraduationCap className="h-6 w-6" />
          <span className="ml-2 text-lg font-semibold">EduEquity</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Dashboard
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Tutoring
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Mentorship
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Scholarships
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Forum
          </Link>
        </nav>
        <Button variant="ghost" size="icon" className="ml-4">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Avatar className="ml-4">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@lakshitaa" />
          <AvatarFallback>LS</AvatarFallback>
        </Avatar>
      </header>
      <main className="flex-1 py-6 px-4 md:px-6 space-y-6">
        <section className="grid gap-4">
          <h1 className="text-3xl font-bold">{greeting}, Lakshitaa! Ready to continue your journey today?</h1>
          <div className="flex flex-wrap gap-2">
            <Button>Continue Learning</Button>
            <Button variant="outline">Schedule a Session</Button>
            <Button variant="outline">Find Scholarships</Button>
            <Button variant="outline">Join Forum Discussion</Button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Learning Progress Overview</h2>
          <div className="grid gap-4">
            {["Math Tutoring", "English Mentorship", "Science Lab"].map((course, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{course}</span>
                    <span className="text-sm font-medium">{75 + index * 5}%</span>
                  </div>
                  <Progress value={75 + index * 5} className="w-full" />
                </div>
                <Button size="sm">Continue</Button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Recommended Courses</h3>
            <ul className="list-disc list-inside">
              <li>Advanced Algebra</li>
              <li>Creative Writing Workshop</li>
              <li>Physics for Beginners</li>
            </ul>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Schedule a Session</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={newDate => newDate && setDate(newDate)} className="rounded-md border" />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Book a Session</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recommended Tutors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Dr. Emily Chen", "Prof. Michael Brown", "Ms. Sarah Johnson"].map((tutor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={tutor} />
                        <AvatarFallback>
                          {tutor
                            .split(" ")
                            .map(n => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{tutor}</p>
                        <p className="text-sm text-muted-foreground">
                          {"★".repeat(4 + (index % 2))} ({20 + index * 5} reviews)
                        </p>
                      </div>
                    </div>
                    <Button size="sm">Request</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Scholarship Suggestions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {["STEM Excellence Scholarship", "Global Leaders Grant", "Arts & Humanities Fellowship"].map((scholarship, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{scholarship}</CardTitle>
                  <CardDescription>Application Deadline: {new Date(Date.now() + (index + 1) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Eligibility: Students with a GPA of 3.5 or higher</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Apply Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Track Progress</h2>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="tests">Mock Tests</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="grid md:grid-cols-3 gap-4">
                {["Mathematics", "Science", "Literature"].map((subject, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{subject}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Sessions Completed</span>
                          <span>{10 + index}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Concepts Mastered</span>
                          <span>{20 + index * 2}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pending Assignments</span>
                          <span>{3 - index}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>Attendance: 95%</p>
                    <p>Average Tutor Rating: 4.8/5</p>
                    <p>Achievements: "Quick Learner" Badge Earned</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tests">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recommended Mock Tests</h3>
                <ul className="list-disc list-inside">
                  <li>Advanced Mathematics (Difficulty: Hard)</li>
                  <li>General Science (Difficulty: Medium)</li>
                  <li>English Comprehension (Difficulty: Easy)</li>
                </ul>
                <Button>Start Test Now</Button>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Virtual Tutoring Session</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">Advanced Algebra with Dr. Emily Chen</p>
              <p className="text-sm text-muted-foreground">Today at 4:00 PM</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button>Join Now</Button>
              <Button variant="outline">Reschedule</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Mentorship</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">Career Guidance with Mr. David Lee</p>
              <p className="text-sm text-muted-foreground">Next meeting: Friday at 2:00 PM</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Community Forum</h2>
          <div className="space-y-4">
            {[
              { title: "Help with Calculus Problem Set 3", replies: 5, likes: 12 },
              { title: "Tips for Writing College Application Essays", replies: 8, likes: 20 },
              { title: "Study Group for upcoming Physics Exam", replies: 3, likes: 7 }
            ].map((post, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {post.replies} replies · {post.likes} likes
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View Thread</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            {[
              { icon: <Bell className="h-5 w-5" />, message: "Your next mock test is tomorrow!" },
              { icon: <Award className="h-5 w-5" />, message: "Congratulations! You've earned the '7-Day Learning Streak' badge." },
              { icon: <Target className="h-5 w-5" />, message: "New scholarship opportunity matching your profile." }
            ].map((notification, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                {notification.icon}
                <p>{notification.message}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">©️ 2024 Educational Equity Platform. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
