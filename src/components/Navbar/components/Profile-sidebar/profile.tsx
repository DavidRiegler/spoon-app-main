import { Camera, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyProfile() {
  const userDataString = localStorage.getItem('userData');
  const user = userDataString
    ? JSON.parse(userDataString).user
    : { name: '', surname: '', username: '', email: '', birthDate: '', phoneNumber: '', propic: '' };

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user.name,
    surname: user.surname,
    username: user.username,
    email: user.email,
    birthDate: user.birthDate ? user.birthDate.split('T')[0] : '',
    phoneNumber: user.phoneNumber,
    propic: user.propic,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();

    const existingUserData = user;

    const updatedUserData = {
      user: {
        ...existingUserData,
        ...formData,
      },
    };

    localStorage.setItem('userData', JSON.stringify(updatedUserData));

    const userId = existingUserData.id;
    const apiUrl = `http://127.0.0.1:3000/api/users/${userId}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authtoken')}`
        },
        body: JSON.stringify(updatedUserData.user),
      });

      if (!response.ok) {
        throw new Error('Failed to update user in database');
      }

    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-vanilla relative">
      <div className="bg-[#ffffd0] rounded-3xl p-8 w-full max-w-md shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="top-4 left-4"
        >
          <ChevronLeft className="text-[#ff69b4]" size={36} />
        </button>
        <h1 className="text-3xl font-bold text-center text-[#ff69b4] mb-6">
          My Profile
        </h1>

        <div className="relative w-32 h-32 mx-auto mb-6">
          <img
            src={formData.propic}
            alt="Profile picture"
            width={128}
            height={128}
            className="rounded-full object-cover"
          />
          <div className="absolute bottom-0 right-0 bg-[#ff69b4] rounded-full p-2">
            <Camera className="w-5 h-5 text-white" />
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={`${formData.name} ${formData.surname}`}
              onChange={(e) => {
                const [name, surname] = e.target.value.split(' ');
                setFormData((prevData) => ({
                  ...prevData,
                  name: name || '',
                  surname: surname || '',
                }));
              }}
              className="w-full px-3 py-2 bg-[#ffffd0] border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#ffffd0] border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#ffffd0] border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#ffffd0] border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#ffffd0] border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#8e4585] text-white py-2 px-4 rounded-md hover:bg-[#6d3266] transition duration-300"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
