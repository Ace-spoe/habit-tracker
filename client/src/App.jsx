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
import PublicRoute from './components/PublicRoute'
import Nav from './components/Nav'


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>}/>
          <Route path='/register' element=          {<PublicRoute><Register /></PublicRoute>}/>
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