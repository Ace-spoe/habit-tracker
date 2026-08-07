import React , { useState , useEffect } from 'react'


const Dashboard = () => {
  const [habit, setHabit] = useState([])
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(true)
  const [toggle, setToggle] = useState(false)
  const [ formData , setFormData ] = useState({
      name : '' , frequency : ''
    })
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

  const habitsList =  habit.map((item) => (
    <p key = {item._id}> {item.name} </p>
  ))

  return (
     <div>
      <div>
        {loading && <p>loading...</p>}
        {habitsList}
        {err && <p>{err}</p>}
    </div>
    {!toggle && 
    <input onClick={() => setToggle( prev => !prev)}
      type = 'submit' value='Add habit'/>}
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