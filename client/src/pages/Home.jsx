import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// SVG Icons
const FlameIcon = () => (
  <svg className="w-4 h-4 text-orange-500 fill-orange-500" viewBox="0 0 24 24">
    <path d="M12 23c-4.97 0-9-3.58-9-8 0-4.19 3.02-7.58 6.16-10.97C9.7 3.46 10.3 2.82 11 2c.38 1.13 1.05 2.21 2.02 3.18C14.75 6.91 17 8.84 17 12c0 .34-.03.67-.08 1-.39-1.25-1.34-2.25-2.58-2.71-1.32-.49-2.71.07-3.32 1.25-.42.82-.32 1.83.25 2.54.43.53 1.07.82 1.73.82.34 0 .68-.08 1-.24.78-.39 1.22-1.25 1.05-2.11C16.82 13.91 18 15.34 18 17c0 3.31-2.69 6-6 6z"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const Home = () => {
  const chartData = [
    { day: "M", height: "55%" },
    { day: "T", height: "38%" },
    { day: "W", height: "78%", highlighted: true },
    { day: "T", height: "62%" },
    { day: "F", height: "82%" },
    { day: "S", height: "54%" },
    { day: "S", height: "35%" },
  ];

  // Hero Text Sequential Stagger
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Bar Chart Stagger
  const barContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  // Bottom Cards Scroll Variant
  const cardScrollVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.12,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="min-h-screen w-full bg-[#f0fdfa] flex flex-col justify-between font-sans text-slate-800 overflow-x-hidden">
      


      {/* Hero Section */}
      <main className="w-full max-w-7xl mx-auto px-6 py-8 sm:py-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        
        {/* Left Side: Animated Bar Chart & Floating Stats Cards */}
        <div className="w-full lg:w-1/2 flex justify-center items-center relative">
          
          {/* Background Particle / Slow Floating Light Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 15, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-10 -left-10 w-72 h-72 bg-teal-300/35 rounded-full blur-3xl pointer-events-none"
          ></motion.div>

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-10 -right-10 w-72 h-72 bg-cyan-300/35 rounded-full blur-3xl pointer-events-none"
          ></motion.div>

          {/* Chart Wrapper Container */}
          <div className="relative w-full max-w-lg bg-[#edf9f8] p-8 sm:p-10 rounded-3xl border border-teal-100/70 shadow-2xl shadow-teal-900/10 flex flex-col items-center overflow-visible">
            
            {/* Floating Card 1: Left Spring Bounce */}
            <motion.div
              initial={{ x: -90, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 110,
                damping: 14,
                delay: 0.6,
              }}
              className="absolute -top-5 -left-4 sm:-left-8 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-white/80 flex items-center gap-3 z-20"
            >
              <div className="p-2 bg-teal-100/80 rounded-xl">
                <CheckCircleIcon />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Weekly Score
                </p>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900">
                  87% Completed
                </p>
              </div>
            </motion.div>

            {/* Floating Card 2: Right Spring Bounce */}
            <motion.div
              initial={{ x: 90, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 110,
                damping: 14,
                delay: 0.7,
              }}
              className="absolute -bottom-5 -right-4 sm:-right-8 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-white/80 flex items-center gap-3 z-20"
            >
              <div className="p-2 bg-orange-100/80 rounded-xl">
                <FlameIcon />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Current Momentum
                </p>
                <p className="text-xs sm:text-sm font-extrabold text-slate-900">
                  14 Days Active Streak
                </p>
              </div>
            </motion.div>

            {/* Main Frosted Glass Card */}
            <div className="w-full bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-lg border border-white/90 relative z-10">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    Weekly Habit Performance
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Active habit consistency</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></span>
                  Today
                </div>
              </div>

              {/* Bar Chart Container */}
              <div className="relative h-52 w-full flex flex-col justify-between pt-2">
                {[100, 80, 60, 40, 20, 0].map((val) => (
                  <div key={val} className="w-full flex items-center gap-3">
                    <span className="text-[10px] font-medium text-slate-400 w-5 text-right">
                      {val}
                    </span>
                    <div className="flex-1 border-b border-slate-200/50"></div>
                  </div>
                ))}

                {/* Staggered Animated Bars */}
                <motion.div
                  variants={barContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute inset-0 pl-8 flex items-end justify-between pr-3 pb-4"
                >
                  {chartData.map((bar, idx) => (
                    <div key={idx} className="relative flex flex-col items-center h-full justify-end">
                      {bar.highlighted && (
                        <div className="absolute -top-3 w-3.5 h-3.5 rounded-full bg-teal-400 border-2 border-white shadow-sm flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-white"></div>
                        </div>
                      )}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: bar.height }}
                        transition={{
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                        className="w-5 sm:w-7 rounded-t-lg bg-gradient-to-t from-orange-400 via-teal-400 to-teal-300 shadow-sm"
                      ></motion.div>
                      <span className="absolute -bottom-5 text-[10px] font-semibold text-slate-500">
                        {bar.day}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Hero Text & Calls to Action */}
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-1/2 space-y-6 text-center lg:text-left"
        >
          <motion.div variants={heroItemVariants}>
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/80 border border-teal-200/60 shadow-sm">
              Measure What Matters
            </span>
          </motion.div>

          <motion.h1
            variants={heroItemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]"
          >
            Build Better Habits,{" "}
            <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Every Single Day
            </span>
          </motion.h1>

          <motion.p
            variants={heroItemVariants}
            className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal"
          >
            Track your daily consistency, analyze long-term growth patterns, and transform small daily actions into permanent life changes with HabitFlow.
          </motion.p>

          <motion.div
            variants={heroItemVariants}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
          >
            <Link
              to="/register"
              className="w-full sm:w-auto px-7 py-4 bg-teal-400 hover:bg-teal-500 text-slate-950 font-extrabold text-sm rounded-2xl transition-all shadow-lg shadow-teal-400/25 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Start Free Today
              <ArrowRightIcon />
            </Link>

            <Link
              to="/login"
              className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-2xl border border-slate-200/80 transition-all shadow-sm active:scale-[0.98]"
            >
              Sign In to Account
            </Link>
          </motion.div>

          <motion.div
            variants={heroItemVariants}
            className="flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 pt-4 font-medium"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
              No credit card required
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
              Instant setup
            </div>
          </motion.div>
        </motion.div>

      </main>

      {/* Feature Cards Grid (01, 02, 03 - Scroll Triggered Animation) */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 my-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 01 */}
          <motion.div
            custom={0}
            variants={cardScrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white rounded-3xl p-8 border border-teal-100/80 shadow-xl shadow-teal-900/5 flex flex-col justify-between hover:border-teal-300 transition-all"
          >
            <div>
              <span className="text-2xl font-black text-teal-400 mb-4 block">01</span>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                Visual Progress
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Interactive weekly bar charts and 5-week GitHub-style activity heatmaps ensure you always know your exact consistency score.
              </p>
            </div>
          </motion.div>

          {/* Card 02 */}
          <motion.div
            custom={1}
            variants={cardScrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white rounded-3xl p-8 border border-teal-100/80 shadow-xl shadow-teal-900/5 flex flex-col justify-between hover:border-teal-300 transition-all"
          >
            <div>
              <span className="text-2xl font-black text-teal-400 mb-4 block">02</span>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                Streak Protection
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Stay motivated with real-time daily momentum badges, active streak counters, and one-tap daily completion logs.
              </p>
            </div>
          </motion.div>

          {/* Card 03 */}
          <motion.div
            custom={2}
            variants={cardScrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white rounded-3xl p-8 border border-teal-100/80 shadow-xl shadow-teal-900/5 flex flex-col justify-between hover:border-teal-300 transition-all"
          >
            <div>
              <span className="text-2xl font-black text-teal-400 mb-4 block">03</span>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                Custom Frequencies
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Tailor habits to your personal routine with flexible daily, weekly, or monthly check-in goals and automated filtering.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Tight Black Footer */}
      <footer className="w-full bg-black text-slate-400 py-5 px-6 sm:px-12 border-t border-slate-900 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <p>© {new Date().getFullYear()} HabitFlow Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;