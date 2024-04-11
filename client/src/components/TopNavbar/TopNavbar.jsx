import React from 'react'
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/user/UserContext"
import { useRoomContext } from '../../context/room/RoomContext';

const TopNavbar = () => {
  const { userData } = useUserContext()
  const { roomData, setMode } = useRoomContext()

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white text-2xl font-bold">CodeHub</Link>
          <div className="flex space-x-10">
            {
              userData && roomData && (
                <div className='flex space-x-10'>
                  <p to="/editor" className="text-white cursor-pointer" onClick={() => setMode("editor")}>
                    Open Editor
                  </p>
                  <p to="/chat" className="text-white cursor-pointer" onClick={() => setMode("chat")}>
                    Ask GPT 3.5
                  </p>
                  <p to="/whiteboard" className="text-white cursor-pointer" onClick={() => setMode("board")}>
                    Whiteboard
                  </p>
                </div>
              )
            }
            {userData && !roomData && (<div className='flex space-x-10'>
              <Link to="/login" className="text-white">
                Login
              </Link>
              <Link to="/signup" className="text-white">
                Sign up
              </Link>
            </div>)
            }


          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopNavbar;
