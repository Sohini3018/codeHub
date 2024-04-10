import React, { useEffect, useState } from 'react'
import { UserContext } from './UserContext'
import useLocalStorage from '../../hooks/useLocalStorage'
import { useNavigate } from "react-router-dom"


function UserContextProvider({ children }) {
    const [userData, setUserData] = useState(null)
    const { getItem } = useLocalStorage()
    const navigate = useNavigate()

    useEffect(() => {
        const userInfo = getItem("user")
        if (userInfo) {
            // navigate to roomJoin
            return navigate("/roomJoin")
        }
        navigate("/login")
    }, [])

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider