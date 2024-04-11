import { useUserContext } from "../context/user/UserContext"
import { Navigate } from "react-router-dom"

function PrivateRoute({ children }) {
    const { userData } = useUserContext()
    if (!userData) return <Navigate to="/" replace />
    return children
}

export default PrivateRoute