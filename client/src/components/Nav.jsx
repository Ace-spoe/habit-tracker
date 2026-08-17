import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate , useLocation} from 'react-router-dom'
import API_URL from '../api/config';


// Custom SVG Logo Icon
const LogoIcon = () => (
  <div className="w-6 h-6 rounded-md bg-linear-to-tr from-teal-400 to-cyan-300 flex items-center justify-center p-1 shadow-sm">
    <div className="w-full h-full border-2 border-white rounded-sm transform rotate-45"></div>
  </div>
);

const Nav = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })
    } catch (err) {
      console.log('Logout request failed:', err)
    }
    logout()
    navigate('/login')
  }

  // Unauthenticated Navigation (HabitFlow Design)
  if (!user) {
    return (
    
        <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-20">
                <Link to="/" className="inline-flex items-center gap-2.5 group">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-400 to-cyan-300 flex items-center justify-center p-1 shadow-md shadow-teal-400/20">
                    <div className="w-full h-full border-2 border-white rounded-sm transform rotate-45"></div>
                  </div>
                  <span className="font-extrabold text-2xl tracking-tight text-slate-900 group-hover:text-teal-600 transition-colors">
                    HabitFlow
                  </span>
                </Link>
        
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2.5 bg-teal-400 hover:bg-teal-500 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-teal-400/20 active:scale-[0.98]"
                  >
                    Get Started
                  </Link>
                </div>
              </header>
    
    )
  }

  // Authenticated Navigation
  return (
    <header className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-teal-100/60">
      <Link to="/" className="flex items-center gap-2">
        <LogoIcon />
        <span className="font-bold text-xl tracking-tight text-slate-900">HabitFlow</span>
      </Link>

      <nav className="flex items-center space-x-8 text-sm font-medium text-slate-600">
        <Link to="/dashboard" className="hover:text-teal-600 transition-colors">Dashboard</Link>
        <Link to="/profile" className="hover:text-teal-600 transition-colors">Profile</Link>
      </nav>

      <button 
        onClick={handleLogout}
        className="bg-slate-950 text-white text-xs md:text-sm font-medium px-4 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-sm"
      >
        Logout
      </button>
    </header>
  )
}

export default Nav