import React, { useState, useEffect } from 'react'
import { UserContext } from './UserContext'
import useLocalStorage from '../../hooks/useLocalStorage'


function UserContextProvider({ children }) {
    const [userData, setUserData] = useState(null)
    const { getItem } = useLocalStorage()

    useEffect(() => {
        const userInfo = getItem("user")
        setUserData(userInfo)
    }, [])


    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider