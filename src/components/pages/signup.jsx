import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import bookImage from './book.png';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    if (!username || !name || !email || !password) {
      toast.error('All fields are required.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await axios.post('http://localhost:5000/api/user/signup', {
        username,
        name,
        email,
        password,
      });
      if (result.status === 200) {
        toast.success('Account created successfully!');
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create account');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="container max-w-4xl mx-auto flex flex-col lg:flex-row bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900">
          <form onSubmit={submitForm} className="w-full">
            <h2 className="text-3xl font-bold text-gray-200 text-center mb-6">
              Sign Up
            </h2>
            <div className="inputBox mb-4">
              <label
                htmlFor="username"
                className="block text-gray-300 text-sm mb-1"
              >
                Username
              </label>
              <input
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Enter your username"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-200"
                required
              />
            </div>
            <div className="inputBox mb-4">
              <label htmlFor="name" className="block text-gray-300 text-sm mb-1">
                Name
              </label>
              <input
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-200"
                required
              />
            </div>
            <div className="inputBox mb-4">
              <label htmlFor="email" className="block text-gray-300 text-sm mb-1">
                Email
              </label>
              <input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-200"
                required
              />
            </div>
            <div className="inputBox mb-4">
              <label
                htmlFor="password"
                className="block text-gray-300 text-sm mb-1"
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
                required
              />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-400 hover:underline">
                Login
              </Link>
            </p>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded hover:opacity-90 transition disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
                  <span className="ml-2">Creating Account...</span>
                </div>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 relative">
          <img
            src={bookImage}
            alt="Sign Up Illustration"
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
