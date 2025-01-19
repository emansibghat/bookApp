import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-700 text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <h1 className="text-2xl font-bold">BookApp</h1>
        <nav className="space-x-6 hidden md:block">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/categories" className="hover:underline">Categories</Link>
          {user && <Link to="/favorites" className="hover:underline">Favorites</Link>}
          {user && <Link to="/ProfilePage" className="hover:underline">Profile</Link>}
        </nav>
        <div className="relative flex items-center">
          {user && <span className="mr-4">Welcome, {user.name}</span>}
          <button className="focus:outline-none" onClick={toggleMenu}>
            <FaEllipsisV className="text-white text-2xl" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-10 mt-2 bg-white border rounded shadow-lg w-48 z-50">
              {!user ? (
                <>
                  <Link to="/signup" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Sign Up
                  </Link>
                  <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Log In
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/ProfilePage" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Update Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
