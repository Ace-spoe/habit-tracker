import React, { useState, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import API_URL from '../api/config';

// SVG Icons
const CameraIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ShieldLockIcon = () => (
  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const UploadIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const [communication, setCommunication] = useState('')
  const [imageURL, setImageURL] = useState('')

  const { updateUser, user } = useAuth()
  const fileInputRef = useRef(null)

  // Default Avatar Fallback SVG
  const defaultAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%2394a3b8' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageURL(URL.createObjectURL(file));
      handleUploadProfilePic(file);
    }
  };

  const handleUploadProfilePic = async (fileToUpload) => {
    const file = fileToUpload || selectedFile;
    if (!file) {
      setErr('Please select an image to upload');
      return;
    }

    try {
      setErr('');
      setCommunication('');
      setLoading(true);

      const data = new FormData();
      data.append('profilePicture', file);

      const res = await fetch(`${API_URL}/api/user/profile-picture`, {
        method: 'PATCH',
        credentials: 'include',
        body: data
      });

      const response = await res.json();

      if (!res.ok) {
        setErr(response.message || 'Failed to upload profile picture');
        return;
      }

      setImageURL(URL.createObjectURL(file));
      updateUser({ url: response.imageData.secure_url, public_id: response.imageData.public_id });
      setCommunication(response.message || 'Profile picture updated successfully!');
    } catch (error) {
      setErr(`Unable to connect: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfilePic = async () => {
    try {
      setErr('');
      setCommunication('');
      setLoading(true);

      const res = await fetch(`${API_URL}/api/user/profile-picture`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const response = await res.json();

      if (!res.ok) {
        setErr(response.message || 'Failed to delete profile picture');
        return;
      }

      setImageURL('');
      setSelectedFile(null);
      updateUser({ url: '', public_id: '' });
      setCommunication(response.message || 'Profile picture removed successfully');
    } catch (error) {
      setErr(`Unable to connect: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      setErr('');
      setCommunication('');

      const res = await fetch(`${API_URL}/api/user/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const response = await res.json();

      if (!res.ok) {
        setErr(response.message || 'Failed to change password');
        return;
      }

      setCommunication(response.message || 'Password changed successfully!');
      setFormData({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (error) {
      setErr(`Unable to connect: ${error.message || error}`);
    }
  };

  const currentAvatarSrc = imageURL || user?.profilePicture?.url || user?.avatar || defaultAvatar;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-[#f0fdfa] flex justify-center py-6 sm:py-10 px-4 font-sans text-slate-800"
    >
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl shadow-teal-900/10 border border-teal-100/50 overflow-hidden flex flex-col my-auto">
        
        {/* LinkedIn-style Cover Banner */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-44 sm:h-56 w-full bg-gradient-to-r from-teal-500 via-teal-400 to-cyan-400 relative overflow-hidden"
        >
          {/* Subtle Ambient Decorative Circles */}
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-10 right-10 w-60 h-60 bg-cyan-300/20 rounded-full blur-2xl pointer-events-none"></div>
        </motion.div>

        {/* Avatar Section & User Info */}
        <div className="px-6 sm:px-10 pb-6 relative border-b border-slate-100">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 sm:gap-6">
            
            {/* Scaled Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="relative group"
            >
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-xl bg-slate-100 overflow-hidden flex items-center justify-center relative">
                <img
                  src={currentAvatarSrc}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                
                {/* Upload Overlay Loader */}
                {loading && (
                  <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-7 h-7 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              {/* Quick Edit (Pencil) Badge */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Change Avatar"
                className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 p-2.5 bg-teal-400 hover:bg-teal-500 text-slate-950 rounded-full shadow-lg border-2 border-white transition-all active:scale-95 cursor-pointer"
              >
                <CameraIcon />
              </button>
            </motion.div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2.5 bg-teal-400 hover:bg-teal-500 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-teal-400/20 active:scale-[0.98] flex items-center gap-2"
              >
                <UploadIcon />
                Change Profile Picture
              </button>

              <button
                type="button"
                onClick={handleDeleteProfilePic}
                disabled={loading}
                className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs sm:text-sm rounded-xl transition-all border border-rose-200 active:scale-[0.98] flex items-center gap-2 disabled:opacity-50"
              >
                <TrashIcon />
                Remove Picture
              </button>
            </div>
          </div>

          {/* Username & Email Meta */}
          <div className="mt-4 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {user?.username || 'Habit Tracker Member'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {user?.email || 'user@habitflow.com'}
            </p>
          </div>
        </div>

        {/* Feedback Alert Banners */}
        <div className="px-6 sm:px-10 pt-4">
          <AnimatePresence>
            {err && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs sm:text-sm font-medium text-center"
              >
                {err}
              </motion.div>
            )}

            {communication && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs sm:text-sm font-medium text-center"
              >
                {communication}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Security / Password Section Card */}
        <div className="p-6 sm:p-10">
          <div className="bg-slate-50/70 rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm">
            
            {/* Card Title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-teal-100/80 rounded-xl border border-teal-200/60">
                <ShieldLockIcon />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Security</h2>
                <p className="text-xs text-slate-500">
                  Update your password to keep your account safe
                </p>
              </div>
            </div>

            {/* Change Password Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setErr('');
                setCommunication('');

                if (formData.newPassword === formData.confirmNewPassword) {
                  handleChangePassword();
                } else {
                  setErr('New password and confirmation do not match');
                }
              }}
              className="space-y-4 max-w-xl"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.oldPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, oldPassword: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.confirmNewPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmNewPassword: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-teal-400 hover:bg-teal-500 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md shadow-teal-400/20 active:scale-[0.99]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Profile;