import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link , useNavigate} from 'react-router-dom'

const Nav = () => {
 const { user , logout } = useAuth()
 const navigate = useNavigate()
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
            <button onClick = {() => {
                logout() 
                navigate('/login')
                }}>Logout</button>
        </div>)
    }
}

export default Nav