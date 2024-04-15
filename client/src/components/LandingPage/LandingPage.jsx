import React from "react";
import image from "../../assets/landing_img.png";

const LandingPage = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Main Content */}
      <div className="flex items-center justify-center h-full bg-gradient-to-r from-purple-500 to-pink-300">
        {/* Your middle content goes here */}
        <div className="flex flex-col md:flex-row items-center text-center text-white tagline-text">
          <div className="md:w-1/2 md:pr-8 mb-4">
            <h1 className="text-5xl text-gray-200 font-bold mb-4">
              Welcome to CodeHub
            </h1>
            <p className="text-xl text-gray-100">
              Empower Your Learning Journey: CodeHub, Where Collaboration Meets Coding Excellence.
            </p>
          </div>
          <div className="md:w-1/2 flex items-center justify-center"> {/* Updated line */}
            <img className="max-w-full h-auto" src={image} alt="" /> {/* Updated line */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
