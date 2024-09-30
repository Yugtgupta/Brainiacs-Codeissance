import React from "react"
import "./LockScreen.css"

const LockScreen = () => {
  return (
    <div className="lock-screen">
      <div className="lock-screen-container">
        <div className="header-section">
          <h1 className="title">Welcome Back!</h1>
          <p className="subtitle">Please select your role to sign in</p>
        </div>

        <div className="role-buttons">
          <button className="role-btn mentor-btn">Sign in as Mentor</button>
          <button className="role-btn student-btn">Sign in as Student</button>
          <button className="role-btn tutor-btn">Sign in as Tutor</button>
        </div>
      </div>
    </div>
  )
}

export default LockScreen
