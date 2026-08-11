import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Social SVG Icons
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const AppleIcon = () => (
  <svg className="w-5 h-5 fill-current text-slate-900" viewBox="0 0 24 24">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.68-.82 1.13-1.97.99-3.12-1 .04-2.18.67-2.88 1.48-.62.72-1.16 1.88-.99 3.01 1.12.09 2.23-.55 2.88-1.37z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5 fill-current text-[#1877F2]" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [err, setErr] = useState(null)
  const navigate = useNavigate()

  const chartData = [
    { day: "M", height: "55%" },
    { day: "T", height: "38%" },
    { day: "W", height: "78%", highlighted: true },
    { day: "T", height: "62%" },
    { day: "F", height: "82%" },
    { day: "S", height: "54%" },
    { day: "S", height: "35%" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const response = await res.json()

      if (!res.ok) {
        setErr(response.message);
        return console.log('Some thing went wrong')
      }

      navigate('/login')

    } catch (err) {
      setErr('Unable to connect to the internet')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen w-full bg-[#f0fdfa] flex items-center justify-center p-0 md:p-6 font-sans text-slate-800"
    >
      <div className="w-full max-w-6xl min-h-screen md:min-h-[700px] bg-white md:rounded-3xl shadow-2xl shadow-teal-900/10 border border-teal-100/50 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Animated Graph Panel (Flipped: Only visible on md+ / Desktop) */}
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex md:w-1/2 bg-[#edf9f8] p-8 sm:p-12 flex-col items-center justify-center relative overflow-hidden border-r border-teal-100/60"
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-300/30 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-300/30 rounded-full blur-3xl pointer-events-none"></div>

          {/* Glass Graph Card */}
          <div className="relative w-full max-w-md bg-white/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl shadow-teal-900/10 border border-white/80">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                Weekly Habit Score
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
                Today
              </div>
            </div>

            <div className="relative h-48 w-full flex flex-col justify-between pt-2">
              {[100, 80, 60, 40, 20, 0].map((val) => (
                <div key={val} className="w-full flex items-center gap-3">
                  <span className="text-[10px] font-medium text-slate-400 w-5 text-right">
                    {val}
                  </span>
                  <div className="flex-1 border-b border-slate-200/50"></div>
                </div>
              ))}

              <div className="absolute inset-0 pl-8 flex items-end justify-between pr-3 pb-4">
                {chartData.map((bar, idx) => (
                  <div key={idx} className="relative flex flex-col items-center h-full justify-end">
                    {bar.highlighted && (
                      <div className="absolute -top-2.5 w-3.5 h-3.5 rounded-full bg-teal-400 border-2 border-white shadow-sm flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-white"></div>
                      </div>
                    )}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: bar.height }}
                      transition={{
                        duration: 0.8,
                        delay: 0.3 + idx * 0.08,
                        ease: "easeOut",
                      }}
                      className="w-5 sm:w-7 rounded-t-lg bg-gradient-to-t from-orange-400 via-teal-400 to-teal-300 shadow-sm"
                    ></motion.div>
                    <span className="absolute -bottom-5 text-[10px] font-semibold text-slate-500">
                      {bar.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-10 z-10">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold text-teal-700 bg-teal-100/80 border border-teal-200/60 mb-3">
              measure what matters
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Build Better Habits, Daily
            </h3>
            <p className="text-xs text-slate-600 mt-2 max-w-xs mx-auto leading-relaxed">
              Track your progress, visualize your growth, and stay consistent with HabitFlow.
            </p>
          </div>
        </motion.div>

        {/* Right Form Panel (Flipped: Full width on mobile, 50% on desktop) */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-between bg-white">
          <div className="my-auto py-8 max-w-sm w-full mx-auto">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                Create an account
              </h2>
              <p className="text-xs text-slate-500">
                Start tracking your habits and measuring growth today
              </p>
            </div>

            {/* Error Display */}
            {err && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium text-center"
              >
                {err}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="johndoe"
                  required
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-teal-400 hover:bg-teal-500 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md shadow-teal-400/20 active:scale-[0.99] mt-2"
              >
                Register
              </button>
            </form>

            <p className="text-center text-xs text-slate-500 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-teal-600 hover:text-teal-700 transition-colors"
              >
                Sign in
              </Link>
            </p>

            {/* Social Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <span className="relative px-3 bg-white text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Or register with
              </span>
            </div>

            {/* Social Buttons */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm active:scale-95"
              >
                <GoogleIcon />
              </button>
              <button
                type="button"
                className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm active:scale-95"
              >
                <AppleIcon />
              </button>
              <button
                type="button"
                className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm active:scale-95"
              >
                <FacebookIcon />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center md:text-left text-[11px] text-slate-400 flex flex-col sm:flex-row justify-between gap-2 pt-4">
            <p>© {new Date().getFullYear()} HabitFlow Technologies Inc.</p>
            <div className="flex justify-center gap-4">
              <a href="#privacy" className="hover:text-slate-600 transition-colors">
                Privacy
              </a>
              <a href="#terms" className="hover:text-slate-600 transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Register;