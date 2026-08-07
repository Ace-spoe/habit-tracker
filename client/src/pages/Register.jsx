import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [ formData , setFormData ] = useState({
    username : '' , email : '' , password : '' 
  })
  const [err , setErr] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
      e.preventDefault()

      try{
        const res = await fetch ("http://localhost:3000/api/auth/register", {
          method : 'POST' ,
          headers : {
            'Content-Type' : 'application/json'
          },
          credentials : 'include',
          body : JSON.stringify(formData)
        })

        const response = await res.json()

        if (!res.ok) {
        setErr(response.message);
        return console.log('Some thing went wrong')
      }

      navigate('/login')

      }catch(err){
        setErr('Unable to connect to the internet')
    }
      

    }
  

  return (
    <form onSubmit = {handleSubmit}>
      <input type="text" 
      placeholder='user name' 
      required 
      value={formData.username} 
      onChange={e => setFormData({...formData , username : e.target.value })} 
      />
      <input type="email" 
      placeholder='Email' 
      required 
      value={formData.email} 
      onChange={e => setFormData({...formData , email : e.target.value })} 
      />
      <input type="password" 
      placeholder='password' 
      required 
      value={formData.password} 
      onChange={e => setFormData({...formData , password : e.target.value})} 
      />
      <input 
      type = 'submit' value='Register'/>
      {err && <p>{err}</p>}
    </form>
  )
}

export default Register