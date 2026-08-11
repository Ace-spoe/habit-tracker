import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [formData, setFormData] = useState({
    oldPassword : '' ,  newPassword : '' , confirmNewPassword : ''
  })
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const { updateUser , user } = useAuth()
  const [imageURL , setImageURL] = useState('')
  const [communication , setCommunication] = useState('')

  const handleUploadProfilePic = async () => {
    try {
     const formData = new FormData()

     if(!selectedFile){
      setErr('Please select an image to upload')
      return console.log('Select an image')
     }
     setLoading(true)

    formData.append('profilePicture' , selectedFile)
    const res = await fetch('http://localhost:3000/api/user/profile-picture', {
      method: 'PATCH',
      credentials: 'include',
      body: formData
      
    })

    const response = await res.json() 
    
    if(!res.ok){
      setErr(response.message)
      return console.log('res.ok failed')
    }

    setImageURL(URL.createObjectURL(selectedFile))
    updateUser({ url: response.imageData.secure_url, public_id: response.imageData.public_id })
    setCommunication(response.message)
    setLoading(false)
      
    } catch (error) {
      setErr(`Unable to connect :'  ${error}`)
    }
    finally {
      setLoading(false)
    }
  }

  const handleDeleteProfilePic = async () => {
    try{
        setLoading(true)
        const res = await fetch('http://localhost:3000/api/user/profile-picture', {
        method: 'DELETE',
        credentials: 'include'
    })

    const response = await res.json() 
    
    if(!res.ok){
      setErr(response.message)
      return console.log('res.ok failed')
    }

    setImageURL('')
    updateUser({ url: '', public_id: ''})
    setCommunication(response.message)
    

    } catch (error) {
      setErr(`Unable to connect :  ${error}`)
    }
    finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
   
    try{
        const res = await fetch ('http://localhost:3000/api/user/change-password' , {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            credentials : "include" ,
            body : JSON.stringify(formData)
        })

        const response = await res.json() 
        if(!res.ok) {
            setErr(response.message)
            return console.log('res.ok failed')
        }

        setCommunication(response.message)
        setFormData({oldPassword : '' ,  newPassword : '' , confirmNewPassword : ''
  })


    } catch (error) {
        setErr(`Unable to connect :  ${error}`)
    }
  }
  
  return (
    <div>
      {loading && <p>Loading...</p>}
      <div>
        <img src={imageURL || user?.profilePicture?.url  ||'/default-avatar.png'} alt="profile-picture" />
        <input type="file" 
        accept='image/*'
        onChange={e => setSelectedFile(e.target.files[0])}
        />
        <input type="button" value="Upload" onClick={() => handleUploadProfilePic()}/>
         <input type="button" value="delete" onClick={() => handleDeleteProfilePic()}/>

         
      </div>

      <form onSubmit={(e) => {
        e.preventDefault()
        if(formData.newPassword === formData.confirmNewPassword) {
            handleChangePassword()
        }
        else {
            return setCommunication('password doesnot match')
        }
      }}>
        <input type="password" required
        placeholder='Old Password'
         value = {formData.oldPassword} 
        onChange={e => setFormData({...formData ,  oldPassword: e.target.value})} 
        />
        <input type="password" required
        placeholder='New Password'
         value = {formData.newPassword} 
        onChange={e => setFormData({...formData ,  newPassword: e.target.value})} 
        />
        <input type="password" required
        placeholder='Confirm New Password'
         value = {formData.confirmNewPassword} 
        onChange={e => setFormData({...formData ,  confirmNewPassword: e.target.value})} 
        />
        <input type="submit" value="Change Password" />
      </form>
      {communication && <p>{communication}</p>}
    </div>
  )
}

export default Profile