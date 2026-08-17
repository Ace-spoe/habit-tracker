import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-8 h-8 border-3 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-slate-400 font-medium">Fetching your habits...</p>
          </div>
      
  }

  if (user) {
    return <Navigate to="/dashboard" />
  }

  return children
}

export default PublicRoute