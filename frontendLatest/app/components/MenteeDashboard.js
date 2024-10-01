import Axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import StateContext from "../StateContext";
import { Link } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import toast from "react-hot-toast";
const MenteeDashboard = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [suggestedMentors, setSuggestedMentors] = useState([]);
  const [studentMentor, setStudentMentor] = useState(null);
  const { user } = useContext(StateContext);

  const appDispatch = useContext(DispatchContext);
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const upcomingSessions = [
    {
      id: 1,
      mentor: "John Doe",
      date: "2024-10-05",
      time: "14:00",
      status: "scheduled",
    },
    {
      id: 2,
      mentor: "Jane Smith",
      date: "2024-10-07",
      time: "16:30",
      status: "scheduled",
    },
  ];

  const recordedSessions = [
    {
      id: 1,
      title: "Introduction to React",
      date: "2024-09-28",
      watchedStatus: false,
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      date: "2024-09-25",
      watchedStatus: false,
    },
  ];
  const logoutHandler = () => {
    appDispatch({ type: "logout" });
    toast.success("Logged out successfully");
    navigate("/");
  };

  // const suggestedMentors = [
  //   {
  //     id: 1,
  //     name: "Alice Johnson",
  //     specialization: "Web Development",
  //     rating: 4.8
  //   },
  //   {
  //     id: 2,
  //     name: "Bob Williams",
  //     specialization: "Data Science",
  //     rating: 4.9
  //   }
  // ]

  const handleJoinSession = (session) => {
    setCurrentSession(session);
    setIsVideoModalOpen(true);
  };

  const closeModal = () => {
    setIsVideoModalOpen(false);
    setCurrentSession(null);
  };

  const getUserDataById = async () => {
    const userData = await Axios.get(`/student/get-by-id/${user.id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    console.log(userData.data.data);

    if (userData?.data.data?.mentorId) {
      const mentorData = await Axios.get(
        `/mentor/get-by-id/${userData.data.data.mentorId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(mentorData.data.data);
      setStudentMentor(mentorData.data.data);
    }
  };

  const connectMentorHandler = async (e, mentor) => {
    e.preventDefault();
    console.log("CONNECT MENTOR HANDLER", mentor);

    await Axios.post(
      `/student/connect-mentor/${user.id}`,
      {
        mentorId: mentor.mentorDoc._id,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
      .then(async (response) => {
        console.log(response);
        // setStudentMentor();
        getUserDataById();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchDataFromDB = async () => {
      try {
        const response = await Axios.get(`/mentor/get-all/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Cache-Control": "no-cache", // This will bypass the cache
            Pragma: "no-cache", // Additional header to ensure cache bypass
            Expires: "0", // Forces the request to be fresh
          },
        });
        console.log(response.data.data);
        setSuggestedMentors(response?.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataFromDB();
    getUserDataById();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      {/* Dashboard Header */}
      {/* <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 transition duration-300 ease-in-out hover:text-blue-600">
          Student Mentorship
        </h1>
        <p className="text-lg text-center text-gray-600">
          Welcome back! Check out your upcoming sessions and explore new
          mentors.
        </p>
      </header> */}
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

      {/* Upcoming Sessions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
        <div className="col-span-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 transition duration-300 ease-in-out hover:text-green-600">
            Upcoming Sessions
          </h2>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="p-4 bg-white shadow-md rounded-lg transition duration-300 ease-in-out hover:shadow-xl hover:bg-blue-50"
              >
                <h3 className="text-lg font-semibold text-gray-700">
                  {session.mentor}
                </h3>
                <p className="text-sm text-gray-500">
                  {session.date} at {session.time}
                </p>
                <button
                  onClick={() => handleJoinSession(session)}
                  className="mt-4 inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-blue-600"
                >
                  Join Session
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recorded Sessions Section */}
        <div className="col-span-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 transition duration-300 ease-in-out hover:text-purple-600">
            Recorded Sessions
          </h2>
          <div className="space-y-4">
            {recordedSessions.map((session) => (
              <div
                key={session.id}
                className="p-4 bg-white shadow-md rounded-lg transition duration-300 ease-in-out hover:shadow-xl hover:bg-purple-50"
              >
                <h3 className="text-lg font-semibold text-gray-700">
                  {session.title}
                </h3>
                <p className="text-sm text-gray-500">{session.date}</p>
                <button
                  onClick={() => handleJoinSession(session)}
                  className="mt-4 inline-block bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-green-600"
                >
                  Watch Session
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Mentors Section */}
        <div className="col-span-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 transition duration-300 ease-in-out hover:text-yellow-600">
            Suggested Mentors
          </h2>
          <div className="space-y-4">
            {suggestedMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="p-4 bg-white shadow-md rounded-lg transition duration-300 ease-in-out hover:shadow-xl hover:bg-yellow-50"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-[6px]">
                  {mentor.mentorDoc.name} {mentor.mentorDoc.lName}
                </h3>
                <p className="text-sm text-gray-500 mb-[6px]">
                  {mentor.mentorDoc.email}
                </p>
                <p className="text-sm text-gray-500 mb-[6px]">
                  Expertise: {mentor.mentorDoc.expertise.join(", ")}
                </p>
                <p className="text-base text-yellow-600 font-semibold">
                  Matching Score: {mentor.score}
                </p>
                {studentMentor && studentMentor._id === mentor.mentorDoc._id ? (
                  <div className="flex flex-col gap-6">
                    <p className="text-sm text-gray-500">
                      You are already connected with this mentor.
                    </p>
                    <Link
                      to={`/chat/${mentor.mentorDoc._id}`}
                      className="bg-emerald-700 text-white text-center hover:no-underline hover:bg-emerald-800 font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                    >
                      Chat
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col w-full">
                    <button
                      onClick={(e) => connectMentorHandler(e, mentor)}
                      className="mt-4 inline-block bg-yellow-500 text-center text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-yellow-600"
                    >
                      Connect
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Video Session */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
            <h2 className="text-2xl font-semibold mb-4">
              {currentSession
                ? currentSession.title ||
                  `Session with ${currentSession.mentor}`
                : "Session"}
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              {currentSession
                ? `Date: ${currentSession.date}, Time: ${
                    currentSession.time || "N/A"
                  }`
                : ""}
            </p>
            <div className="bg-gray-200 w-full h-56 rounded-lg flex items-center justify-center text-gray-600">
              Video or Zoom session placeholder
            </div>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-lg transition duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenteeDashboard;
