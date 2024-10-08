"use client"

import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { CalendarIcon, ProgressIcon, ScholarshipIcon, TutorIcon } from "lucide-react"
import React from "react"

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Personalized Welcome Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold">Good Morning, Lakshitaa! Ready to continue your journey today?</h1>
        <div className="mt-4 flex space-x-4">
          <Button className="bg-blue-500 text-white hover:bg-blue-600">Continue Learning</Button>
          <Button className="bg-green-500 text-white hover:bg-green-600">Schedule a Session</Button>
          <Button className="bg-yellow-500 text-white hover:bg-yellow-600">Find Scholarships</Button>
          <Button className="bg-purple-500 text-white hover:bg-purple-600">Join Forum Discussion</Button>
        </div>
      </div>

      {/* Learning Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card className="p-4">
          <h2 className="font-semibold text-lg">Learning Progress Overview</h2>
          <ProgressBar courseName="Math Tutoring" progress={70} />
          <ProgressBar courseName="English Mentorship" progress={50} />
          <Button className="mt-4 w-full">See All Courses</Button>
        </Card>
      </div>

      {/* Schedule a Session */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card className="p-4">
          <h2 className="font-semibold text-lg">Schedule a Session</h2>
          <Calendar />
          <Button className="mt-4 w-full">Request a Session</Button>
        </Card>
      </div>

      {/* Scholarship Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card className="p-4">
          <h2 className="font-semibold text-lg">Recommended Scholarships</h2>
          <ScholarshipCard title="Scholarship A" deadline="2024-12-01" />
          <ScholarshipCard title="Scholarship B" deadline="2024-11-15" />
          <Button className="mt-4 w-full">See All Scholarships</Button>
        </Card>
      </div>

      {/* Track Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card className="p-4">
          <h2 className="font-semibold text-lg">Track Progress</h2>
          <ProgressWidget />
          <Button className="mt-4 w-full">View Detailed Reports</Button>
        </Card>
      </div>

      {/* Virtual Tutoring Sessions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card className="p-4">
          <h2 className="font-semibold text-lg">Upcoming Sessions</h2>
          <SessionCard sessionTime="2024-10-01 10:00 AM" />
          <SessionCard sessionTime="2024-10-02 11:00 AM" />
          <Button className="mt-4 w-full">View All Sessions</Button>
        </Card>
      </div>

      {/* Notifications Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-4">
          <h2 className="font-semibold text-lg">Notifications</h2>
          <Notification message="Your next mock test is tomorrow!" />
          <Notification message="Don't forget to review your tutor's feedback!" />
        </Card>
      </div>
    </div>
  )
}

// Progress Bar Component
const ProgressBar = ({ courseName, progress }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{courseName}</span>
        <span className="font-medium">{progress}%</span>
      </div>
      <div className="bg-gray-200 rounded-full h-2">
        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }} />
      </div>
      <Button className="mt-1 w-full">Continue Learning</Button>
    </div>
  )
}

// Calendar Component (Placeholder)
const Calendar = () => {
  return (
    <div className="mt-4 border border-gray-300 rounded-lg p-4">
      <CalendarIcon size={24} />
      <p className="mt-2 text-gray-700">Calendar view goes here...</p>
    </div>
  )
}

// Scholarship Card Component
const ScholarshipCard = ({ title, deadline }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-gray-600">Application Deadline: {deadline}</p>
      <Button className="mt-2 w-full">Start Application</Button>
    </div>
  )
}

// Progress Widget (Placeholder)
const ProgressWidget = () => {
  return (
    <div>
      <p>Your academic progress goes here...</p>
    </div>
  )
}

// Session Card Component
const SessionCard = ({ sessionTime }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="font-semibold">Session Time: {sessionTime}</h3>
      <Button className="mt-2 w-full">Join Now</Button>
      <Button className="mt-2 w-full">Reschedule</Button>
    </div>
  )
}

// Notification Component
const Notification = ({ message }) => {
  return <div className="bg-yellow-100 p-2 rounded-lg mb-2">{message}</div>
}

export default Dashboard
