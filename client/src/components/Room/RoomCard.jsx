import React from 'react'
import { useNavigate } from "react-router-dom"
import { useUserContext } from '../../context/user/UserContext'
import { useRoomContext } from '../../context/room/RoomContext'


function RoomCard({ roomName, _id, rooms }) {
    const navigate = useNavigate()
    const { userData } = useUserContext()
    const { setRoomData } = useRoomContext()
    const handleClick = async (_id) => {
        const room = rooms.find((el) => el._id === _id)
        console.log(room)
        setRoomData(room)
        navigate(`/room/${_id}`)
    }
    return (
        <div className='w-full bg-blue-500 p-4 flex justify-center rounded-md font-semibold text-white cursor-pointer' onClick={() => handleClick(_id)}>
            {roomName}
        </div>
    )
}

export default RoomCard