import React from 'react'
import { Link } from "react-router-dom";

const TopNavbar = () => {
  return (
    <div>
        <nav className="bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white text-2xl font-bold">CodeHub</Link>
          <div className="flex space-x-10">
            <Link to="/editor" className="text-white">
              Open Editor
            </Link>
            <Link to="/chat" className="text-white">
              Ask GPT 3.5
            </Link>
            <Link to="/whiteboard" className="text-white">
              Start Collaboration
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopNavbar;
