import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function LockScreen() {
  return (
    <div className="flex justify-center items-center w-full h-[100svh]">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="header-section">
          <h1 className="title text-4xl">Welcome Back!</h1>
          <p className="subtitle">Please select your role to sign in</p>
        </div>
        <div className="flex justify-center items-center flex-col gap-6 w-full">
          <Link
            to="/"
            className="rounded-md text-lg border-2 border-black bg-transparent text-black w-fit text-center hover:no-underline hover:text-black flex justify-center items-center gap-2 px-4 py-2"
          >
            <ArrowLeft /> Go Back
          </Link>
          <Link
            to="/register"
            className="role-btn mentor-btn bg-red-500 w-full text-center hover:no-underline hover:text-white"
          >
            Register as Student
          </Link>
          <Link
            to="/login"
            className="role-btn student-btn bg-red-500 w-full text-center hover:no-underline hover:text-white"
          >
            SignIn as Student
          </Link>
          <Link
            to="/register-mentor"
            className="role-btn tutor-btn bg-emerald-600 w-full text-center hover:no-underline hover:text-white"
          >
            Register as Mentor
          </Link>
          <Link
            to="/login-mentor"
            className="role-btn tutor-btn bg-emerald-600  w-full text-center hover:no-underline hover:text-white"
          >
            SignIn as Mentor
          </Link>
          <Link
            to="/register-tutor"
            className="role-btn tutor-btn bg-orange-600 w-full text-center hover:no-underline hover:text-white"
          >
            Register as Tutor
          </Link>
          <Link
            to="/login-tutor"
            className="role-btn tutor-btn bg-orange-600 w-full text-center hover:no-underline hover:text-white"
          >
            SignIn as Tutor
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LockScreen;
