import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/user/UserContext"
import { useRoomContext } from '../../context/room/RoomContext';
import { IoExit } from "react-icons/io5";
import useLocalStorage from "../../hooks/useLocalStorage.js"

const TopNavbar = () => {
  const { userData, setUserData } = useUserContext()
  const { roomData, setMode } = useRoomContext()
  const navigate = useNavigate()
  const { deleteItem } = useLocalStorage()

  const handleLogout = () => {
    deleteItem("user")
    setUserData(null)
    navigate("/")
  }

  return (
    <div>
      <nav className="bg-gray-800 p-4 h-16">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white text-2xl font-bold">CodeHub</Link>
          <div className="flex space-x-10">
            {
              userData && roomData && (
                <div className='flex space-x-10'>
                  <div className='flex gap-2 items-center cursor-pointer' onClick={() => navigate("/roomJoin")}>
                    <IoExit className='text-3xl text-gray-300' />
                    <p className='text-gray-300 '>Leave</p>
                  </div>
                  <p to="/editor" className="text-white cursor-pointer" onClick={() => setMode("editor")}>
                    Open Editor
                  </p>
                  <p to="/chat" className="text-white cursor-pointer" onClick={() => setMode("chat")}>
                    Ask GPT 3.5
                  </p>
                  <p to="/whiteboard" className="text-white cursor-pointer" onClick={() => setMode("board")}>
                    Whiteboard
                  </p>
                  <label htmlFor="my-drawer" className="text-white cursor-pointer drawer-button">Users</label>
                </div>
              )
            }
            {!userData && !roomData && (<div className='flex space-x-10'>
              <Link to="/login" className="text-white">
                Login
              </Link>
              <Link to="/signup" className="text-white">
                Sign up
              </Link>
            </div>)
            }
            {
              userData && !roomData && (
                <p className='text-white cursor-pointer' onClick={handleLogout}>LogOut</p>
              )
            }


          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopNavbar;
