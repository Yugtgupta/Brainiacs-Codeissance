import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Camera } from 'lucide-react';

// Simulated API call to fetch user data
const fetchUserData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "Lakshitaa",
        courses: [
          { name: "Math Tutoring", progress: 75 },
          { name: "English Mentorship", progress: 60 },
          { name: "Science Lab", progress: 85 }
        ],
        performanceData: [
          { month: 'Jan', score: 65 },
          { month: 'Feb', score: 70 },
          { month: 'Mar', score: 75 },
          { month: 'Apr', score: 80 },
        ],
        upcomingSessions: [
          { date: '2024-10-01', time: '15:00', subject: 'Math' },
          { date: '2024-10-03', time: '16:30', subject: 'English' }
        ],
        scholarships: [
          { name: "STEM Excellence Scholarship", deadline: "2024-11-15" },
          { name: "National Merit Award", deadline: "2024-12-01" }
        ],
        mentorInfo: {
          name: "Dr. Jane Smith",
          nextSession: "2024-10-02 14:00",
          messages: [
            { sender: "mentor", text: "How's your progress on the Math assignment?" },
            { sender: "student", text: "I'm almost done, just struggling with the last problem." },
            { sender: "mentor", text: "Great! Let's review it in our next session." }
          ]
        },
        communityPosts: [
          { title: "Tips for Acing Your SATs", author: "StudyGuru", replies: 23 },
          { title: "College Application Essay Workshop", author: "WriteRight", replies: 15 }
        ]
      });
    }, 1000); // Simulate network delay
  });
};

const styles = {
  dashboard: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f0f4f8',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  greeting: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  quickActions: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  section: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#34495e',
  },
  progressBar: {
    height: '20px',
    backgroundColor: '#ecf0f1',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '10px',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2ecc71',
    transition: 'width 0.5s ease-in-out',
  },
  calendar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '5px',
  },
  calendarDay: {
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
  },
  mentorSection: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  mentorInfo: {
    flex: 1,
    marginRight: '20px',
  },
  mentorChat: {
    flex: 2,
    backgroundColor: '#f9f9f9',
    padding: '10px',
    borderRadius: '5px',
    height: '200px',
    overflowY: 'auto',
  },
  scholarshipCard: {
    backgroundColor: '#f1f8e9',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
  },
  communityPost: {
    backgroundColor: '#e3f2fd',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
  },
  loadingScreen: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '24px',
  }
};

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData().then(data => {
      setUserData(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div style={styles.loadingScreen}>Loading your dashboard...</div>;
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div style={styles.dashboard}>
      <header style={styles.header}>
        <h1 style={styles.greeting}>{`${getGreeting()}, ${userData.name}!`}</h1>
        <div style={styles.quickActions}>
          <button style={styles.button}>Continue Learning</button>
          <button style={styles.button}>Schedule a Session</button>
          <button style={styles.button}>Find Scholarships</button>
        </div>
      </header>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Learning Progress</h2>
        {userData.courses.map((course) => (
          <div key={course.name}>
            <p>{course.name}</p>
            <div style={styles.progressBar}>
              <div style={{...styles.progressFill, width: `${course.progress}%`}} />
            </div>
          </div>
        ))}
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Performance Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userData.performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Upcoming Sessions</h2>
        <div>
          {userData.upcomingSessions.map((session, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <Calendar size={16} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
              <span>{`${session.date} ${session.time} - ${session.subject}`}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Scholarship Opportunities</h2>
        {userData.scholarships.map((scholarship, index) => (
          <div key={index} style={styles.scholarshipCard}>
            <h3>{scholarship.name}</h3>
            <p>Deadline: {scholarship.deadline}</p>
            <button style={styles.button}>Apply Now</button>
          </div>
        ))}
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Mentorship</h2>
        <div style={styles.mentorSection}>
          <div style={styles.mentorInfo}>
            <h3>Your Mentor: {userData.mentorInfo.name}</h3>
            <p>Next Session: {userData.mentorInfo.nextSession}</p>
          </div>
          <div style={styles.mentorChat}>
            {userData.mentorInfo.messages.map((message, index) => (
              <p key={index} style={{ textAlign: message.sender === 'mentor' ? 'left' : 'right' }}>
                <strong>{message.sender === 'mentor' ? 'Mentor: ' : 'You: '}</strong>
                {message.text}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Community Forum</h2>
        {userData.communityPosts.map((post, index) => (
          <div key={index} style={styles.communityPost}>
            <h3>{post.title}</h3>
            <p>By: {post.author} | Replies: {post.replies}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;