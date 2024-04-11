import React from 'react'

function RoomCard({ roomName }) {
    return (
        <div className='w-full bg-blue-500 p-4 flex justify-center rounded-md font-semibold text-white'>
            {roomName}
        </div>
    )
}

export default RoomCard