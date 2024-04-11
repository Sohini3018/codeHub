import React from 'react'
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/user/UserContext"

const TopNavbar = () => {
  const { userData } = useUserContext()
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white text-2xl font-bold">CodeHub</Link>
          <div className="flex space-x-10">
            {
              userData ? (
                <div className='flex space-x-10'>
                  <Link to="/editor" className="text-white">
                    Open Editor
                  </Link>
                  <Link to="/chat" className="text-white">
                    Ask GPT 3.5
                  </Link>
                  <Link to="/whiteboard" className="text-white">
                    Whiteboard
                  </Link>
                </div>
              ) : <div className='flex space-x-10'>
                <Link to="/login" className="text-white">
                  Login
                </Link>
                <Link to="/signup" className="text-white">
                  Sign up
                </Link>
              </div>
            }


          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopNavbar;
