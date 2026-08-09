import { createContext , useContext , useState } from "react";

const AuthContext = createContext()

export function AuthProvider({children}) {
    const [user, setUser] = useState(null)
    
    const login = (userData) => setUser(userData)
    const logout = () => setUser(null)
    const updaetUser = (userData) => setUser(prev => ({...prev, profilePicture: userData})) 
    
    return (
        <AuthContext.Provider value = {{user , login , logout , updaetUser}}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {
  return useContext(AuthContext)
}