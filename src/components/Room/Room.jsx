import React from "react";
import img from "../../assets/landing_img.png"
const Room = () => {
  return (

      <div className="h-screen w-screen px-10 flex gap-8 items-center  bg-gradient-to-r from-purple-500 to-pink-300">
        <div className="w-[30%] h-2/3  bg-rose-100 rounded-2xl flex flex-col items-center p-4">
            <div>
            <h1 className="text-2xl font-bold tracking-tighter ">
      Rooms
        </h1>

            </div>
        </div>


      <div className="w-96 h-2/3 bg-rose-100 rounded-2xl flex flex-col items-center justify-evenly">
        <h1 className="text-2xl font-bold tracking-tighter">
      CodeHub
        </h1>

     

        <form action="" className="flex flex-col gap-y-4">
          <input type="text" placeholder="room name" className="p-3 rounded-xl"/>
          <input type="password" placeholder="password" className="p-3 rounded-xl"/>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white mt-4 rounded-full p-4"
          >
            Create Room 
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white mt-4 rounded-full p-4"
          >
            Join Room
          </button>
          
        </form>
      </div>
      <div>
        <img src={img} alt="" srcset="" />
      </div>
    </div>
  );
};

export default Room;
