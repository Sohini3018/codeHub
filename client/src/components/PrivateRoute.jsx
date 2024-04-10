import { useUserContext } from "../context/user/UserContext"
import { Navigate } from "react-router-dom"

function PrivateRoute({ children }) {
    const { userData } = useUserContext()
    if (!userData) return <Navigate to="/login" replace />
    return children
}

export default PrivateRoute