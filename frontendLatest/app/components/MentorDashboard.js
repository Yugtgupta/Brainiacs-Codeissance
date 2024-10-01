import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import StateContext from "../StateContext";
import { Link } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import toast from "react-hot-toast";

// Sample Data (to be replaced with actual data fetching)
const initialUpcomingSessions = [
  {
    id: 1,
    mentee: "Lakshitaa Chellaramani",
    date: "2024-10-05",
    time: "14:00",
    status: "scheduled",
  },
  {
    id: 2,
    mentee: "Rahul Sharma",
    date: "2024-10-07",
    time: "16:30",
    status: "scheduled",
  },
];

const initialPastSessions = [
  {
    id: 1,
    mentee: "Nina Patel",
    date: "2024-09-25",
    time: "12:00",
    title: "Introduction to Python",
  },
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
  const styles = {
    dashboard: {
      fontFamily: "Arial, sans-serif",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    greeting: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#2c3e50",
    },
    quickActions: {
      display: "flex",
      gap: "10px",
    },
    button: {
      padding: "10px 15px",
      color: "black",
      fontWight: "600",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    section: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "15px",
      color: "#34495e",
    },
    progressBar: {
      height: "20px",
      backgroundColor: "#ecf0f1",
      borderRadius: "10px",
      overflow: "hidden",
      marginBottom: "10px",
    },
    progressFill: {
      height: "100%",
      backgroundColor: "#2ecc71",
      transition: "width 0.5s ease-in-out",
    },
    calendar: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "5px",
    },
    calendarDay: {
      padding: "10px",
      textAlign: "center",
      backgroundColor: "#e0e0e0",
      borderRadius: "5px",
    },
    mentorSection: {
      display: "flex",
      justifyContent: "space-between",
    },
    mentorInfo: {
      flex: 1,
      marginRight: "20px",
    },
    mentorChat: {
      flex: 2,
      backgroundColor: "#f9f9f9",
      padding: "10px",
      borderRadius: "5px",
      height: "200px",
      overflowY: "auto",
    },
    scholarshipCard: {
      backgroundColor: "#f1f8e9",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "5px",
    },
    communityPost: {
      backgroundColor: "#e3f2fd",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "5px",
    },
    loadingScreen: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "24px",
    },
  };
  const [upcomingSessions, setUpcomingSessions] = useState(
    initialUpcomingSessions
  );
  const [pastSessions, setPastSessions] = useState(initialPastSessions);
  const [suggestedMentees, setSuggestedMentees] = useState(
    initialSuggestedMentees
  );
  const [recentForumPosts, setRecentForumPosts] = useState(
    initialRecentForumPosts
  );
  const [allStudents, setAllStudents] = useState([]);

  const appDispatch = useContext(DispatchContext);

  const { user } = useContext(StateContext);

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

  useEffect(() => {
    // Fetch all the students from the backend
    const fetchAllStudents = async () => {
      try {
        const response = await Axios.get("/student/get-all", {
          // Fixed endpoint typo
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        const allStudentss = response.data.data;
        console.log("ASTudeNTS", allStudentss);
        setAllStudents(allStudentss);
        // Handle the fetched students as needed
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllStudents(); // Call the function directly
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  const logoutHandler = () => {
    appDispatch({ type: "logout" });
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-100 min-h-screen">
      <header style={styles.header}>
        <Link
          to="/dashboard"
          style={styles.greeting}
        >{`${getGreeting()}, User`}</Link>
        <div style={styles.quickActions}>
          <button
            style={styles.button}
            className="hover:bg-transparent hover:underline"
          >
            Continue Learning
          </button>
          {/* <button style={styles.button}>Schedule a Session</button> */}
          <button
            style={styles.button}
            className="hover:bg-transparent hover:underline"
          >
            Find Scholarships
          </button>
          {user?.role === "tutor" && (
            <Link
              to="/dashboard/schedule-meet"
              style={styles.button}
              className="hover:bg-transparent hover:underline"
            >
              Schedule Tutoring
            </Link>
          )}
          {user?.role === "student" && (
            <Link
              to="/dashboard/student-mentorship"
              style={styles.button}
              className="hover:bg-transparent hover:underline"
            >
              Mentee
            </Link>
          )}
          {user?.role === "mentor" && (
            <Link
              to="/dashboard/mentor-dashboard"
              style={styles.button}
              className="hover:bg-transparent hover:underline"
            >
              Mentor
            </Link>
          )}
          <button
            style={styles.button}
            onClick={logoutHandler}
            className="hover:bg-transparent hover:underline"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* Upcoming Mentee Sessions */}
        <section className="lg:col-span-2 xl:col-span-3 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Upcoming Mentee Sessions
          </h2>
          <ul className="space-y-4">
            {upcomingSessions.map((session) => (
              <li key={session.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {session.mentee}
                    </p>
                    <p className="text-sm text-gray-500">
                      {session.date} at {session.time}
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: {session.status}
                    </p>
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Past Sessions
          </h2>
          <ul className="space-y-4">
            {pastSessions.map((session) => (
              <li key={session.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {session.mentee}
                    </p>
                    <p className="text-sm text-gray-500">
                      {session.date} at {session.time}
                    </p>
                    <p className="text-sm text-gray-500">
                      Session Title: {session.title}
                    </p>
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Your Mentees
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allStudents.map((mentee) => {
              if (mentee.mentorId) {
                return (
                  <div key={mentee.id} className="border rounded-lg p-4">
                    <p className="font-semibold text-gray-900">
                      {mentee.name} {mentee.lName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {mentee.cntactNumber}
                    </p>
                    <p className="text-sm text-yellow-500 mb-2">
                      Email: {mentee.email}
                    </p>
                    <button
                      onClick={() => handleViewMenteeProfile(mentee.id)}
                      className="w-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded"
                    >
                      View Profile
                    </button>
                  </div>
                );
              }
            })}
          </div>
        </section>

        {/* Recent Forum Posts */}
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Forum Posts
          </h2>
          <ul className="space-y-4">
            {recentForumPosts.map((post) => (
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
