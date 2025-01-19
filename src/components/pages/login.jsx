import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import bookImage from './book.png';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      debugger
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
      });
      if (response.data) {
        login(response.data, response.data.token);
        toast.success('Login successful!');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="container max-w-4xl mx-auto flex flex-col lg:flex-row bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12">
          <form onSubmit={submitForm} className="w-full">
            <h2 className="text-3xl font-bold text-gray-200 text-center mb-6">
              Login
            </h2>
            <div className="inputBox mb-4">
              <label
                htmlFor="email"
                className="block text-gray-200 text-sm mb-1"
              >
                Email
              </label>
              <input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Enter your Email"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-200"
                required
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
                required
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
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded hover:opacity-90 transition disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
                  <span className="ml-2">Logging in...</span>
                </div>
              ) : (
                'Login'
              )}
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
