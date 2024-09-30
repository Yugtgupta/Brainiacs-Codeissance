import React from "react";
import { Link } from "react-router-dom";

function LockScreen() {
  return (
    <div className="lock-screen">
      <div className="lock-screen-container">
        <div className="header-section">
          <h1 className="title">Welcome Back!</h1>
          <p className="subtitle">Please select your role to sign in</p>
        </div>
        <div className="role-buttons">
          <Link to="/register" className="role-btn mentor-btn">
            Sign in as Mentor
          </Link>
          <Link to="/register" className="role-btn student-btn">
            Sign in as Student
          </Link>
          <Link to="/register" className="role-btn tutor-btn">
            Sign in as Tutor
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LockScreen;
