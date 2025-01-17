import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="bg-blue-700 text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <h1 className="text-2xl font-bold">BookApp</h1>
        <nav className="space-x-6 hidden md:block">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/categories" className="hover:underline">
            Categories
          </Link>
          <Link to="/favorites" className="hover:underline">
            Favorites
          </Link>
          <Link to="/ProfilePage" className="hover:underline">
            Profile
          </Link>
        </nav>
        <div className="relative flex items-center">
          <button
            className="focus:outline-none"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <FaEllipsisV className="text-white text-2xl" />
          </button>
          {menuOpen && (
            <div
              className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-48 z-50"
              style={{ minWidth: "150px" }}
            >
              <Link
                to="/signup"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Log In
              </Link>
              <button
                onClick={() => alert("Logged out")}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Log Out
              </button>
              <Link
                to="/update-profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Update Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
