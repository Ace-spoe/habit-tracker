import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


const ProtectedRoute = ({children}) => {
    const { user , loading } = useAuth()

    if (loading) {
    return <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-8 h-8 border-3 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-slate-400 font-medium">Loading...</p>
          </div>
   }
   
    if(!user) {
       return <Navigate to = '/login'/>
    }

   return children

    
}

export default ProtectedRoute