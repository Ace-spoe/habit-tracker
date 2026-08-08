import React , { useState , useEffect } from 'react'


const Dashboard = () => {
  const [habit, setHabit] = useState([])
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(true)
  const [toggle, setToggle] = useState(false)
  const [ formData , setFormData ] = useState({
      name : '' , frequency : ''
    })
  const [toggleForEdit, setToggleForEdit] = useState('')
  const [ editFormData , setEditFormData ] = useState({
      name : '' , frequency : ''
    })

  function handleToggleForEdit( id ) {
    setToggleForEdit(prev => {
      if(prev === id) {
        return ''
      } 
      
      else{ 
        return id
      }
    })
  }

  const getHabits = async () => {
    try {
      
      const res = await fetch ("http://localhost:3000/api/habits", {
          method : 'GET' ,
          headers : {
            'Content-Type' : 'application/json'
          },
          credentials : 'include'
    })
    
    const response = await res.json()
    
    if (!res.ok) {
      setLoading(false)
          setErr(response.message);
          return console.log('Some thing went wrong')
    }

    setHabit(response.data)
    setLoading(false)

    }catch(err){
      setLoading(false)
      setErr('Unable to connect to the internet')
      
    }
    
  }

  useEffect(() => {
    getHabits()
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()

    try {

      const res = await fetch ("http://localhost:3000/api/habits", {
          method : 'POST' ,
          headers : {
            'Content-Type' : 'application/json'
          },
          credentials : 'include',
          body : JSON.stringify(formData)
    })
    
    const response = await res.json()
    
    if (!res.ok) {
      setLoading(false)
          setErr(response.message);
          return console.log('Some thing went wrong')
    }

    getHabits()
    setFormData({
      name : '' , frequency : ''
    })
    setToggle(false)


    }catch(err){
      setErr('Unable to connect to the internet')
    }
  }

  const handleDelete = async (id) => {

    try {
       const res = await fetch (`http://localhost:3000/api/habits/${id}`, {
          method : 'DELETE' ,
          headers : {
            'Content-Type' : 'application/json'
          },
          credentials : 'include',
    })
    
    if (!res.ok) {
          setErr('Some thing went wrong');
          return console.log('Some thing went wrong')
    }

    console.log('Deleted Successfuly')
    getHabits()

    } catch (err) {
      setErr('Unable to connect to the internet')
    }
  }

  const handleEdit = async (e , id) => {
    e.preventDefault()
    
    
    try {
      const res = await fetch (`http://localhost:3000/api/habits/${id}`, {
          method : 'PUT' ,
          headers : {
            'Content-Type' : 'application/json'
          },
          credentials : 'include',
          body : JSON.stringify(editFormData)
    })
    
    const response = await res.json()
    
    if (!res.ok) {
      setLoading(false)
      setErr(response.message);
      return console.log('Some thing went wrong')
    }
    console.log('Editied succesfully')
    getHabits()

    } catch (err) {
      setErr('Unable to connect to the internet')
    }
  }

  const habitsList =  habit.map((item) => (
    <div key = {item._id}>
      <p> {item.name} </p> 
      <input type="button" value="Delete" onClick={ () => handleDelete(item._id) } />

      <input type="button" value="Edit" 
      onClick={ () => {
        handleToggleForEdit(item._id)
        setEditFormData({ name: item.name, frequency: item.frequency })
        } } />
      {toggleForEdit === item._id  && 
      
      <form onSubmit={(e) => handleEdit(e , item._id)}>
      <input type="text" 
      required placeholder='new name'
      value = {editFormData.name} 
      onChange={e => setEditFormData({...editFormData , name : e.target.value })}
      />
      <select 
      value={editFormData.frequency}
      onChange={e => setEditFormData({...editFormData, frequency: e.target.value})}>
        <option value="">Select new Frequency</option>
        <option value="daily">daily</option>
        <option value="weekly">weekly</option>
        <option value="monthly">monthly</option>
      </select>

      <input type = 'submit'/>
      {err && <p>{err}</p>}
      </form>
      }
    </div>
    
    
  ))

  return (
     <div>
      <div>
        {loading && <p>loading...</p>}
        {habitsList}
        {err && <p>{err}</p>}
    </div>
    
    <input onClick={() => setToggle( prev => !prev)}
      type = 'submit' value='Add habit'/>
    {toggle && 
    <form onSubmit={handleCreate}>
      <input type="text" 
      required placeholder='name'
      value = {formData.name} 
      onChange={e => setFormData({...formData , name : e.target.value })}
      />
      <select 
      value={formData.frequency}
      onChange={e => setFormData({...formData, frequency: e.target.value})}>
        <option value="">Select Frequency</option>
        <option value="daily">daily</option>
        <option value="weekly">weekly</option>
        <option value="monthly">monthly</option>
      </select>

      <input type = 'submit'/>
      {err && <p>{err}</p>}
    </form>
    }

     </div>
    
    
  )
  
}

export default Dashboard