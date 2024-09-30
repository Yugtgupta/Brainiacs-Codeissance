import React from "react";
import { Link } from "react-router-dom";

const ScheduleMeetTutor = () => {
  return (
    <div className="h-[100svh] relative">
      {/* <h2>Video Stream</h2> */}
      <iframe
        src="https://zoom-clone-seven-wheat.vercel.app/"
        allow="camera; microphone; display-capture"
        // allow="camera; microphone"
        className="w-full h-full"
      />
      <Link
        to="/dashboard"
        className="absolute right-[40px] top-[16px] px-3 py-1 rounded-full text-2xl bg-white text-black hover:no-underline"
      >
        Go Back
      </Link>
    </div>
  );
};

export default ScheduleMeetTutor;
