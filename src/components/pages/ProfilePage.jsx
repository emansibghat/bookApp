import React, { useState } from 'react';
import Navbar from "./Navbar";
const ProfilePage = () => {
  const [username, setUsername] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log({ username, email, profilePicture });
  };

  return (
    <>
    <Navbar />
    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    
      <div className="container max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Profile Page</h2>
       
        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24">
            <img
              src={
                profilePicture
                  ? URL.createObjectURL(profilePicture)
                  : 'https://via.placeholder.com/150'
              }
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-2 border-gray-300"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
        
        {/* Profile Details */}
        <form onSubmit={handleUpdateProfile}>
          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
          >
            Update Profile
          </button>
        </form>

        {/* Default Options */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Default Settings</h3>
          <ul className="space-y-3">
            <li className="bg-gray-200 p-3 rounded">Receive notifications: Enabled</li>
            <li className="bg-gray-200 p-3 rounded">Dark mode: Disabled</li>
            <li className="bg-gray-200 p-3 rounded">Language: English</li>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
