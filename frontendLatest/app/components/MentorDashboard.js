import React, { useState } from 'react';

// Sample Data (to be replaced with actual data fetching)
const initialUpcomingSessions = [
  { id: 1, mentee: "Lakshitaa Chellaramani", date: "2024-10-05", time: "14:00", status: 'scheduled' },
  { id: 2, mentee: "Rahul Sharma", date: "2024-10-07", time: "16:30", status: 'scheduled' },
];

const initialPastSessions = [
  { id: 1, mentee: "Nina Patel", date: "2024-09-25", time: "12:00", title: "Introduction to Python" },
];

const initialSuggestedMentees = [
  { id: 1, name: "John Doe", specialization: "Web Development", rating: 4.8 },
  { id: 2, name: "Jane Smith", specialization: "Data Science", rating: 4.9 },
];

const initialRecentForumPosts = [
  { id: 1, title: "Best practices for online mentoring", date: "2024-09-30" },
  { id: 2, title: "Common challenges faced by mentees", date: "2024-09-29" },
];

const MentorDashboard = () => {
  const [upcomingSessions, setUpcomingSessions] = useState(initialUpcomingSessions);
  const [pastSessions, setPastSessions] = useState(initialPastSessions);
  const [suggestedMentees, setSuggestedMentees] = useState(initialSuggestedMentees);
  const [recentForumPosts, setRecentForumPosts] = useState(initialRecentForumPosts);

  const handleJoinSession = (sessionId) => {
    // Logic to join a video session
    alert(`Joining session with ID: ${sessionId}`);
  };

  const handleViewFeedback = (sessionId) => {
    // Logic to view feedback for the session
    alert(`Viewing feedback for session ID: ${sessionId}`);
  };

  const handleViewMenteeProfile = (menteeId) => {
    // Logic to view mentee's profile
    alert(`Viewing profile for mentee ID: ${menteeId}`);
  };

  const handleViewForumPost = (postId) => {
    // Logic to view forum post
    alert(`Viewing forum post with ID: ${postId}`);
  };

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-100 min-h-screen">
      <header className="bg-white shadow rounded-lg mb-8 p-6">
        <h1 className="text-3xl font-bold text-gray-900">Mentor Dashboard</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* Upcoming Mentee Sessions */}
        <section className="lg:col-span-2 xl:col-span-3 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Mentee Sessions</h2>
          <ul className="space-y-4">
            {upcomingSessions.map(session => (
              <li key={session.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">{session.mentee}</p>
                    <p className="text-sm text-gray-500">{session.date} at {session.time}</p>
                    <p className="text-sm text-gray-500">Status: {session.status}</p>
                  </div>
                  <button 
                    onClick={() => handleJoinSession(session.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Join
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Past Sessions */}
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Sessions</h2>
          <ul className="space-y-4">
            {pastSessions.map(session => (
              <li key={session.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">{session.mentee}</p>
                    <p className="text-sm text-gray-500">{session.date} at {session.time}</p>
                    <p className="text-sm text-gray-500">Session Title: {session.title}</p>
                  </div>
                  <button 
                    onClick={() => handleViewFeedback(session.id)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  >
                    View Feedback
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Suggested Mentees */}
        <section className="lg:col-span-2 xl:col-span-3 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Suggested Mentees</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedMentees.map(mentee => (
              <div key={mentee.id} className="border rounded-lg p-4">
                <p className="font-semibold text-gray-900">{mentee.name}</p>
                <p className="text-sm text-gray-500">{mentee.specialization}</p>
                <p className="text-sm text-yellow-500 mb-2">Rating: {mentee.rating}</p>
                <button 
                  onClick={() => handleViewMenteeProfile(mentee.id)}
                  className="w-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Forum Posts */}
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Forum Posts</h2>
          <ul className="space-y-4">
            {recentForumPosts.map(post => (
              <li key={post.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">{post.title}</p>
                    <p className="text-sm text-gray-500">{post.date}</p>
                  </div>
                  <button 
                    onClick={() => handleViewForumPost(post.id)}
                    className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded"
                  >
                    View
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default MentorDashboard;
