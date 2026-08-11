import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// SVG Icons
const CloseIcon = () => (
  <svg className="w-5 h-5 text-slate-400 hover:text-slate-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const FlameIcon = () => (
  <svg className="w-4 h-4 text-orange-500 fill-orange-500" viewBox="0 0 24 24">
    <path d="M12 23c-4.97 0-9-3.58-9-8 0-4.19 3.02-7.58 6.16-10.97C9.7 3.46 10.3 2.82 11 2c.38 1.13 1.05 2.21 2.02 3.18C14.75 6.91 17 8.84 17 12c0 .34-.03.67-.08 1-.39-1.25-1.34-2.25-2.58-2.71-1.32-.49-2.71.07-3.32 1.25-.42.82-.32 1.83.25 2.54.43.53 1.07.82 1.73.82.34 0 .68-.08 1-.24.78-.39 1.22-1.25 1.05-2.11C16.82 13.91 18 15.34 18 17c0 3.31-2.69 6-6 6z"/>
  </svg>
);

const HabitDetail = ({ habit, onClose }) => {
  if (!habit) return null;

  const totalCompletions = habit.completedDates?.length || 0;
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Generate 35 days (5 full weeks) aligned Mon-Sun ending on current week's Sunday
  const generateHeatmapDays = () => {
    const days = [];
    const today = new Date();
    const currentDayOfWeek = (today.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
    const daysUntilSunday = 6 - currentDayOfWeek;
    const totalDays = 35; // 5 weeks

    for (let i = totalDays - 1 - daysUntilSunday; i >= -daysUntilSunday; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      days.push(d);
    }
    return days;
  };

  const heatmapDays = generateHeatmapDays();
  const todayStr = new Date().toDateString();

  // Animation Variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.015, delayChildren: 0.1 }
    }
  };

  const dayVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-teal-100/80 relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200/60 mb-1.5">
                Habit Analytics
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {habit.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors border border-slate-100"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Stats Row Badges */}
          <div className="grid grid-cols-3 gap-2.5 mb-6">
            <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-3 text-center flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 mb-0.5">
                <FlameIcon />
                Streak
              </div>
              <span className="text-sm sm:text-base font-extrabold text-slate-900">
                {habit.streak || 0} days
              </span>
            </div>

            <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-3 text-center flex flex-col items-center justify-center">
              <span className="text-[11px] font-semibold text-slate-500 mb-0.5">
                📅 Frequency
              </span>
              <span className="text-sm sm:text-base font-extrabold text-slate-900 capitalize">
                {habit.frequency || 'Daily'}
              </span>
            </div>

            <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-3 text-center flex flex-col items-center justify-center">
              <span className="text-[11px] font-semibold text-slate-500 mb-0.5">
                ✅ Total
              </span>
              <span className="text-sm sm:text-base font-extrabold text-slate-900">
                {totalCompletions} times
              </span>
            </div>
          </div>

          {/* GitHub Progress Heatmap Section */}
          <div className="bg-slate-50/60 border border-slate-100/80 rounded-2xl p-4 sm:p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-900">
                Progress Heatmap
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">
                Last 5 Weeks
              </span>
            </div>

            {/* Day Header Row */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-2 text-center">
              {daysOfWeek.map((day) => (
                <span key={day} className="text-[10px] font-bold text-slate-400">
                  {day}
                </span>
              ))}
            </div>

            {/* Staggered Heatmap Grid */}
            <motion.div
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-7 gap-1.5 sm:gap-2 justify-items-center"
            >
              {heatmapDays.map((dateObj, idx) => {
                const dateStr = dateObj.toDateString();
                const isToday = dateStr === todayStr;
                const isCompleted = habit.completedDates?.some(
                  (d) => new Date(d).toDateString() === dateStr
                );

                // Conditional Heatmap Coloring
                let bgColor = 'bg-slate-200/80';
                if (isCompleted && isToday) {
                  bgColor = 'bg-[#FF6B6B] shadow-sm shadow-rose-200';
                } else if (isCompleted) {
                  bgColor = 'bg-teal-400 shadow-sm shadow-teal-200';
                }

                return (
                  <motion.div
                    key={idx}
                    variants={dayVariants}
                    title={`${dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}: ${isCompleted ? 'Completed' : 'Not Completed'}`}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${bgColor} transition-all duration-200 flex items-center justify-center cursor-pointer hover:scale-110 relative group`}
                  >
                    {isToday && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white absolute top-1 right-1"></span>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Heatmap Legend */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mt-4 pt-3 border-t border-slate-200/50">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-slate-200/80"></span>
                <span>Missed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-teal-400"></span>
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-[#FF6B6B]"></span>
                <span>Today</span>
              </div>
            </div>
          </div>

          {/* Footer Close Button */}
          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full py-3 bg-teal-400 hover:bg-teal-500 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-teal-400/20 active:scale-[0.98]"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HabitDetail;