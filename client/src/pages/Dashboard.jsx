import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HabitDetail from './HabitDetail'
import API_URL from '../api/config';

// SVG Icons
const SearchIcon = () => (
  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const PencilIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5 text-slate-400 hover:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const FlameIcon = () => (
  <svg className="w-4 h-4 text-orange-500 fill-orange-500" viewBox="0 0 24 24">
    <path d="M12 23c-4.97 0-9-3.58-9-8 0-4.19 3.02-7.58 6.16-10.97C9.7 3.46 10.3 2.82 11 2c.38 1.13 1.05 2.21 2.02 3.18C14.75 6.91 17 8.84 17 12c0 .34-.03.67-.08 1-.39-1.25-1.34-2.25-2.58-2.71-1.32-.49-2.71.07-3.32 1.25-.42.82-.32 1.83.25 2.54.43.53 1.07.82 1.73.82.34 0 .68-.08 1-.24.78-.39 1.22-1.25 1.05-2.11C16.82 13.91 18 15.34 18 17c0 3.31-2.69 6-6 6z"/>
  </svg>
);

const Dashboard = () => {
  const [habit, setHabit] = useState([])
  const [selectedHabitId, setSelectedHabitId] = useState(null)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(true)
  const [toggle, setToggle] = useState(false)
  const [formData, setFormData] = useState({ name: '', frequency: '' })
  const [toggleForEdit, setToggleForEdit] = useState('')
  const [editFormData, setEditFormData] = useState({ name: '', frequency: '' })

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

  function handleToggleForEdit(id) {
    setToggleForEdit(prev => (prev === id ? '' : id))
  }

  function handleNext() {
    if (pagination.currentPage < pagination.totalPages) {
      setPage(prev => prev + 1)
    }
  }

  function handlePrev() {
    if (pagination.currentPage > 1) {
      setPage(prev => prev - 1)
    }
  }

  const getHabits = async () => {
    try {
      setLoading(true)
      setErr('')
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (frequency) params.append('frequency', frequency)
      params.append('sortBy', sortBy)
      params.append('sortOrder', sortOrder)
      params.append('page', page)
      params.append('limit', limit)

      const res = await fetch(`${API_URL}/api/habits?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const response = await res.json()

      if (!res.ok) {
        setLoading(false)
        setErr(response.message || 'Something went wrong')
        return
      }

      setHabit(response.data || [])
      setPagination(response.pagination || { currentPage: 1, totalPages: 1, totalItems: 0 })
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setErr('Unable to connect to the internet')
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      getHabits()
    }, 500)
    return () => clearTimeout(timer)
  }, [search, frequency, sortBy, sortOrder, page, limit])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      setErr('')
      const res = await fetch(`${API_URL}/api/habits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const response = await res.json()

      if (!res.ok) {
        setErr(response.message || 'Something went wrong')
        return
      }

      getHabits()
      setFormData({ name: '', frequency: '' })
      setToggle(false)
    } catch (err) {
      setErr('Unable to connect to the internet')
    }
  }

  const handleDelete = async (id) => {
    try {
      setErr('')
      const res = await fetch(`${API_URL}/api/habits/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      if (!res.ok) {
        setErr('Something went wrong')
        return
      }

      getHabits()
    } catch (err) {
      setErr('Unable to connect to the internet')
    }
  }

  const handleEdit = async (e, id) => {
    e.preventDefault()
    try {
      setErr('')
      const res = await fetch(`${API_URL}/api/habits/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(editFormData)
      })

      const response = await res.json()

      if (!res.ok) {
        setErr(response.message || 'Something went wrong')
        return
      }

      getHabits()
      setToggleForEdit('')
    } catch (err) {
      setErr('Unable to connect to the internet')
    }
  }

  const handleComplete = async (id) => {
    try {
      setErr('')
      const res = await fetch(`${API_URL}/api/habits/${id}/complete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const response = await res.json()

      if (!res.ok) {
        setErr(response.message || 'Failed to complete habit')
      }

      getHabits()
    } catch (err) {
      setErr('Unable to connect to the internet')
    }
  }

  const selectedHabit = habit.find(h => h._id === selectedHabitId)

  // Card Stagger Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen w-full bg-[#f0fdfa] py-8 px-4 sm:px-8 font-sans text-slate-800"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header & Search/Filter Section */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-teal-900/5 border border-teal-100/60 flex flex-col gap-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                My Habits
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Track your consistency and maintain your daily streaks
              </p>
            </div>

            <button
              onClick={() => {
                setErr('')
                setToggle(true)
              }}
              className="px-5 py-3 bg-teal-400 hover:bg-teal-500 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md shadow-teal-400/20 active:scale-[0.98] flex items-center justify-center gap-2 self-start sm:self-auto"
            >
              <PlusIcon />
              Add New Habit
            </button>
          </div>

          {/* Controls Bar: Search, Filter, Sort */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
            {/* Search Bar */}
            <div className="relative flex items-center">
              <div className="absolute left-3.5 pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search habits..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
              />
            </div>

            {/* Frequency Filter */}
            <div>
              <select
                value={frequency}
                onChange={e => setFrequency(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-slate-700"
              >
                <option value="">All Frequencies</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-slate-700"
              >
                <option value="createdAt">Sort by Creation Date</option>
                <option value="name">Sort by Name</option>
                <option value="streak">Sort by Streak</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <select
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-slate-700"
              >
                <option value="asc">Ascending Order</option>
                <option value="desc">Descending Order</option>
              </select>
            </div>
          </div>
        </div>

        {/* Global Error Alert */}
        <AnimatePresence>
          {err && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium text-center shadow-sm"
            >
              {err}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-8 h-8 border-3 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-slate-400 font-medium">Fetching your habits...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && habit.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-teal-100/60 shadow-sm max-w-lg mx-auto my-8">
            <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-teal-100">
              <PlusIcon />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No habits found</h3>
            <p className="text-xs text-slate-500 mb-6">
              You don't have any habits registered matching your criteria. Click below to add one!
            </p>
            <button
              onClick={() => {
                setErr('')
                setToggle(true)
              }}
              className="px-5 py-3 bg-teal-400 hover:bg-teal-500 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-teal-400/20 active:scale-[0.98]"
            >
              Add Your First Habit
            </button>
          </div>
        )}

        {/* Habits Grid */}
        {!loading && habit.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {habit.map((item) => {
              const isCompletedToday = item.completedDates?.some(
                date => new Date(date).toDateString() === new Date().toDateString()
              )

              return (
                <motion.div
                  key={item._id}
                  variants={itemVariants}
                  className="bg-white rounded-2xl p-5 shadow-lg shadow-teal-900/5 border border-slate-100/80 hover:border-teal-200 transition-all flex flex-col justify-between gap-4 group relative"
                >
                  {/* Card Header & Frequency Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 cursor-pointer flex-1" onClick={() => setSelectedHabitId(selectedHabitId === item._id ? null : item._id)}>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200/60">
                        {item.frequency || 'Daily'}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                    </div>

                    {/* Actions: Edit & Delete */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          handleToggleForEdit(item._id)
                          setEditFormData({ name: item.name, frequency: item.frequency || 'daily' })
                        }}
                        title="Edit Habit"
                        className="p-2 text-slate-400 hover:text-teal-600 hover:bg-slate-50 rounded-lg transition-all active:scale-95"
                      >
                        <PencilIcon />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        title="Delete Habit"
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all active:scale-95"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>

                  {/* Card Body: Streak Stats */}
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <FlameIcon />
                    <span>Streak: {item.streak || 0} days</span>
                  </div>

                  {/* Card Footer: Complete Button */}
                  <button
                    onClick={() => !isCompletedToday && handleComplete(item._id)}
                    disabled={isCompletedToday}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                      isCompletedToday
                        ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                        : 'bg-teal-400 hover:bg-teal-500 text-slate-950 shadow-sm active:scale-[0.98]'
                    }`}
                  >
                    {isCompletedToday ? (
                      <>
                        <CheckIcon />
                        Done Today
                      </>
                    ) : (
                      'Complete Today'
                    )}
                  </button>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* Pagination Bar */}
        {!loading && habit.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <button
              onClick={handlePrev}
              disabled={pagination.currentPage <= 1}
              className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-all flex items-center gap-1 font-semibold"
            >
              <ChevronLeftIcon />
              Previous
            </button>

            <span className="font-semibold text-slate-700">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={pagination.currentPage >= pagination.totalPages}
              className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-all flex items-center gap-1 font-semibold"
            >
              Next
              <ChevronRightIcon />
            </button>
          </div>
        )}

        {/* Add Habit Modal Overlay */}
        <AnimatePresence>
          {toggle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-teal-100/80 relative"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-extrabold text-slate-900">Add New Habit</h2>
                  <button onClick={() => setToggle(false)} className="p-1 rounded-lg hover:bg-slate-100 transition-colors">
                    <CloseIcon />
                  </button>
                </div>

                <form onSubmit={handleCreate} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Habit Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Read 20 pages"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Frequency</label>
                    <select
                      value={formData.frequency}
                      onChange={e => setFormData({ ...formData, frequency: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                    >
                      <option value="">Select Frequency</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <div className="pt-3 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setToggle(false)}
                      className="w-1/2 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-3 px-4 bg-teal-400 hover:bg-teal-500 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-teal-400/20 active:scale-[0.98]"
                    >
                      Create Habit
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Edit Habit Modal Overlay */}
        <AnimatePresence>
          {toggleForEdit && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-teal-100/80 relative"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-extrabold text-slate-900">Edit Habit</h2>
                  <button onClick={() => setToggleForEdit('')} className="p-1 rounded-lg hover:bg-slate-100 transition-colors">
                    <CloseIcon />
                  </button>
                </div>

                <form onSubmit={e => handleEdit(e, toggleForEdit)} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">New Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Morning Jog"
                      value={editFormData.name}
                      onChange={e => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Frequency</label>
                    <select
                      value={editFormData.frequency}
                      onChange={e => setEditFormData({ ...editFormData, frequency: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                    >
                      <option value="">Select Frequency</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <div className="pt-3 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setToggleForEdit('')}
                      className="w-1/2 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-3 px-4 bg-teal-400 hover:bg-teal-500 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-teal-400/20 active:scale-[0.98]"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Selected Habit Detail Drawer/Modal */}
        {selectedHabit && (
          <HabitDetail habit={selectedHabit} onClose={() => setSelectedHabitId(null)} />
        )}

      </div>
    </motion.div>
  )
}

export default Dashboard