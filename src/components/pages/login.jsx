import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bookImage from './book.png';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
       <div className="container max-w-4xl mx-auto flex flex-col lg:flex-row bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12">
          <form onSubmit={submitForm} className="w-full">
            <h2 className="text-3xl font-bold text-gray-200 text-center mb-6">
              Login
            </h2>
            <div className="inputBox mb-4">
              <label
                htmlFor="name"
                className="block text-gray-200 text-sm mb-1"
              >
                Name
              </label>
              <input
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-200"
              />
            </div>
            <div className="inputBox mb-4">
              <label
                htmlFor="password"
                className="block text-gray-200 text-sm mb-1"
              >
                Password
              </label>
              <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-200"
              />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-400 hover:underline">
                Sign Up
              </Link>
            </p>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded hover:opacity-90 transition"
            >
              Login
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 relative">
          <img
            src={bookImage}
            alt="Login Illustration"
            className="h-full w-full object-cover opacity-70 transition-opacity duration-500 hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
