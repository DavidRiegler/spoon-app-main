import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown, Key, User, Eye, EyeOff } from 'react-feather';

export default function Settings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordSectionOpen, setPasswordSectionOpen] = useState(false);
  const [deleteSectionOpen, setDeleteSectionOpen] = useState(false);
  const navigate = useNavigate();

  const userDataString = localStorage.getItem('userData');
  const user = userDataString ? JSON.parse(userDataString).user : null;

  const handleBack = () => {
    navigate(-1);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const updatedUserData = {
      ...user,
      password: newPassword,
    };

    const userId = user.id;
    const apiUrl = `http://127.0.0.1:3000/api/users/${userId}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authtoken')}`,
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

      localStorage.setItem('userData', JSON.stringify({ user: updatedUserData }));
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleDeleteAccount = async () => {
    const userId = user.id;
    const apiUrl = `http://127.0.0.1:3000/api/users/${userId}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authtoken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const togglePasswordSection = () => {
    setPasswordSectionOpen(!passwordSectionOpen);
    if (!passwordSectionOpen) {
      setDeleteSectionOpen(false);
    }
  };

  const toggleDeleteSection = () => {
    setDeleteSectionOpen(!deleteSectionOpen);
    if (!deleteSectionOpen) {
      setPasswordSectionOpen(false);
    }
  };

  const renderPasswordInput = (
    value: string | number | readonly string[] | undefined,
    onChange: { (value: React.SetStateAction<string>): void; (arg0: string): void },
    placeholder: string | undefined,
    showPassword: boolean,
    setShowPassword: { (value: React.SetStateAction<boolean>): void; (arg0: boolean): void }
  ) => (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 bg-white border-black border rounded-lg pr-10"
      />
      <button
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-vanilla flex flex-col">
      <header className="w-full bg-vanilla p-3 md:p-4 flex items-center">
        <button className="text-lila" onClick={handleBack}>
          <ChevronLeft size={20} className="md:w-6 md:h-6" />
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-lila flex-grow text-center">Settings</h1>
        <div className="w-5 h-5 md:w-6 md:h-6 bg-vanilla"></div>
      </header>

      <main className="flex-grow w-full max-w-[95%] md:max-w-md mx-auto p-3 md:p-4 flex flex-col space-y-3 md:space-y-4">
        <div className="w-full">
          <button
            onClick={togglePasswordSection}
            className="flex items-center justify-between w-full p-3 md:p-4 bg-white rounded-lg shadow"
          >
            <div className="flex items-center">
              <Key className="text-lila mr-2 md:mr-3" size={20} />
              <span className="text-sm md:text-base">Password Settings</span>
            </div>
            <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${passwordSectionOpen ? 'rotate-180' : ''}`} />
          </button>

          {passwordSectionOpen && (
            <div className="mt-3 md:mt-4 bg-white p-4 md:p-6 rounded-lg shadow-sm space-y-3 md:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                {renderPasswordInput(currentPassword, setCurrentPassword, 'Enter current password', showCurrentPassword, setShowCurrentPassword)}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                {renderPasswordInput(newPassword, setNewPassword, 'Enter new password', showNewPassword, setShowNewPassword)}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                {renderPasswordInput(confirmPassword, setConfirmPassword, 'Confirm new password', showConfirmPassword, setShowConfirmPassword)}
              </div>
              <button
                onClick={handleChangePassword}
                className="w-full bg-lila text-white py-3 rounded-full font-medium"
              >
                Change Password
              </button>
            </div>
          )}
        </div>

        <div className="w-full">
          <button
            onClick={toggleDeleteSection}
            className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow"
          >
            <div className="flex items-center">
              <User className="text-lila mr-3" size={24} />
              <span>Delete Account</span>
            </div>
            <ChevronDown size={20} className={`text-gray-400 transition-transform duration-200 ${deleteSectionOpen ? 'rotate-180' : ''}`} />
          </button>

          {deleteSectionOpen && (
            <div className="mt-4 bg-red-50 p-4 rounded-lg shadow-sm">
              <p className="text-red-600 text-sm mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
              <button
                onClick={handleDeleteAccount}
                className="w-full bg-red-600 text-white py-3 rounded-full font-medium"
              >
                Confirm Account Deletion
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
