import React from 'react'
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import HabitDetail from './pages/HabitDetail'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/dashboard' element={ <ProtectedRoute><Dashboard /></ProtectedRoute>}/>
          <Route path='/dashboard/habits/:id' element={<ProtectedRoute><HabitDetail /></ProtectedRoute>}/>
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
   
  )
}

export default App