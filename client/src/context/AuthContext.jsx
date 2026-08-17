import { createContext , useContext , useState , useEffect} from "react";
import API_URL from "../api/config";

const AuthContext = createContext()

export function AuthProvider({children}) {
    const [user, setUser] = useState(null)
    const [loading , setLoading] = useState(true)
    const [err , setErr] = useState('')

    const login = (userData) => setUser(userData)
    const logout = () => setUser(null)
    const updaetUser = (userData) => setUser(prev => ({...prev, profilePicture: userData})) 
    
    useEffect(() => {
    const checkAuth = async () => {
    try {
    const res = await fetch(`${API_URL}/api/auth/me`, {
      credentials: 'include'
    })
    
    if (res.ok) {
      const data = await res.json()
      setUser(data.userData)
    }

    setLoading(false)
     } catch (err) {
    setLoading(false)
    setErr('Unable to Connect to the Internet')
    console.log('Unable to Connect to the Internet')
     }
    }
    checkAuth()
    }, []) 


    return (
        <AuthContext.Provider value = {{user , login , logout , updaetUser , err , loading }}>
            {children}
        </AuthContext.Provider>
    )

}



export function useAuth() {
  return useContext(AuthContext)
}