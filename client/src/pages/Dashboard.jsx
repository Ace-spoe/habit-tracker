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

    const [search, setSearch] = useState('')
    const [frequency, setFrequency] = useState('')
    const [sortBy, setSortBy] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState('asc') 
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [pagination, setPagination] = useState({
      currentPage: 1,
      totalPages: 1,
      totalItems: 0
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

  function handleNext () {
  if(pagination.currentPage < pagination.totalPages) {
    setPage(prev => prev + 1)
  }
}

function handlePrev () {
  if(pagination.currentPage > 1) {
    setPage(prev => prev - 1)
  }
}


  const getHabits = async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (frequency) params.append('frequency', frequency)
      params.append('sortBy', sortBy)
      params.append('sortOrder', sortOrder)
      params.append('page', page)
      params.append('limit', limit)
      const res = await fetch (`http://localhost:3000/api/habits?${params.toString()}`, {
          method : 'GET' ,
          headers : {
            'Content-Type' : 'application/json'
          },
          credentials : 'include',
          
    })
    
    const response = await res.json()
    
    if (!res.ok) {
      setLoading(false)
          setErr(response.message);
          return console.log('Some thing went wrong')
    }

    setHabit(response.data)
    setPagination(response.pagination)
    setLoading(false)

    }catch(err){
      setLoading(false)
      setErr('Unable to connect to the internet')
      
    }
    
  }

  useEffect(() => {
    const timer = 
      setTimeout(() => { getHabits() } , 500)
    return () => clearTimeout(timer)
  }, [search , frequency , sortBy , sortOrder , page , limit ])

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

  const handleComplete = async (id) => {
  
   try {
    const res = await fetch (`http://localhost:3000/api/habits/${id}/complete`, {
          method : 'PATCH' ,
          headers : {
            'Content-Type' : 'application/json'
          },
          credentials : 'include'
    })
    
    const response = await res.json()
    
    if (!res.ok) {
      setErr(response.message);
    }

    getHabits()

    } catch(err) {
      setErr('Unable to connect to the internet')
    }
  }



  const habitsList =  habit.map((item) => {

    const isCompletedToday = item.completedDates?.some(date => new Date(date).toDateString() === new Date().toDateString())

    return (
    <div key = {item._id}>
      <p> {item.name} </p> 
      <input 
        type="button" 
        value={isCompletedToday ? "Done today" : "Complete today"} 
        onClick={() => !isCompletedToday && handleComplete(item._id)}
        disabled={isCompletedToday}
      /> 
       <br />
      <input type="button" value="Edit" 
      onClick={ () => {
        handleToggleForEdit(item._id)
        setEditFormData({ name: item.name, frequency: item.frequency })
        }} />

      <input type="button" value="Delete" onClick={ () => handleDelete(item._id) } />

      { toggleForEdit === item._id  && 
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
    
    
  )
  })

  return (
     <div>
      <div>
        {loading && <p>loading...</p>}
        <input type="text" value = {search} onChange = { e => setSearch(e.target.value)} />
        <select 
      value={frequency}
      onChange={e => setFrequency(e.target.value)}>
        <option value="">Filter by Frequency</option>
        <option value="daily">daily</option>
        <option value="weekly">weekly</option>
        <option value="monthly">monthly</option>
      </select>
      <select  
      value={sortBy}
      onChange={e => setSortBy(e.target.value)}>
        <option value={sortBy}>Sort by</option>
         <option value="createdAt">Creation Date</option>
        <option value="name">Name</option>
        <option value="streak">streak</option>
      </select>
      <select value= {sortOrder}
      onChange={e => setSortOrder(e.target.value)}>
        <option value=''> Sort order</option>
         <option value="asc">ascending</option>
        <option value="desc">descending</option>
      </select>

        {habitsList}
        <input type="button" value="prev" onClick={() => handlePrev()}/>
        <p> Page :{pagination.currentPage} of {pagination.totalPages}</p>
        <input type="button" value="next" onClick={() => handleNext()}/>
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