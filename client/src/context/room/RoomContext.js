import { createContext, useContext } from "react"

const RoomContext = createContext(null)

const useRoomContext = () => {
    return useContext(RoomContext)
}

export { RoomContext, useRoomContext }