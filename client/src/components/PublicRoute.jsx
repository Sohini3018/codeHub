import { useUserContext } from '../context/user/UserContext'
import { Navigate } from "react-router-dom"

function PublicRoute({ children }) {
    const { userData } = useUserContext()
    if (userData) return <Navigate to="/roomJoin" replace />
    return children
}

export default PublicRoute