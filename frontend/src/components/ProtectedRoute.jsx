import { Navigate } from "react-router-dom"
import { getAuthToken } from "../utils/auth" // 

const ProtectedRoute = ({ children }) => {
  const token = getAuthToken()  

  if (!token) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
