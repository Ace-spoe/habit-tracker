import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link , useNavigate} from 'react-router-dom'

const Nav = () => {
 const { user , logout } = useAuth()
 const navigate = useNavigate()

 const handleLogout = async () => {
  try {
    await fetch('http://localhost:3000/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    })
  } catch (err) {
    console.log('Logout request failed:', err)
  }
  logout()
  navigate('/login')
}

 if (!user){
    return (<div>
            <Link to = "/register">Register </Link>
            <Link to = "/login">Login</Link>
        </div>)
    
    }
    else{
        return (<div>
            <Link to = "/dashboard">Dashboard</Link>
            <Link to = "/profile">Profile</Link>
            <button onClick = {handleLogout}>Logout</button>
        </div>)
    }
}

export default Nav