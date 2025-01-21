import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import axios from "axios";
import bookImage from "./book.png";
import Books from "./booknew.png";

const API_URL = "https://localhost:5000/api"; 

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${API_URL}/books`);
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        alert("Failed to load books. Please try again.");
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const addToFavorites = (book) => {
    if (favorites.some((fav) => fav.id === book.id)) {
      alert("Book is already in favorites!");
    } else {
      setFavorites((prev) => [...prev, book]);
      alert(`${book.title} added to favorites!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
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
            <button className="focus:outline-none" onClick={toggleMenu}>
              <FaEllipsisV className="text-2xl" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-48 z-50">
                <Link to="/signup" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Sign Up
                </Link>
                <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Log In
                </Link>
                <button
                  onClick={() => alert("Logged out")}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Log Out
                </button>
                <Link
                  to="/ProfilePage"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Update Profile
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative h-[750px] bg-cover bg-center"
        style={{ backgroundImage: `url(${Books})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-4">
          <h2 className="text-4xl font-bold">Discover Your Next Favorite Book</h2>
          <p className="mt-4 text-lg">Browse thousands of books across various genres</p>
          <Link
            to="/AddBookPage"
            className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded text-white font-bold"
          >
            Add Books
          </Link>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Books</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition"
                >
                  <img src={book.image || bookImage} alt={book.title} className="h-40 w-full object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-700">{book.title}</h3>
                    <p className="text-sm text-gray-500">{book.author}</p>
                    <button
                      onClick={() => addToFavorites(book)}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Add to Favorites
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
