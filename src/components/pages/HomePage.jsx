import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import axios from "axios";
import bookImage from "./book.png";
import Books from "./booknew.png";
import FavouritesPage from "./favourites";

import { useDispatch } from "react-redux";
import { addToFavoriteDB } from "../../redux/slices/favSlice";


const HomePage = () => {
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Fetch favorites from the database
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/favorites");
        setFavorites(response.data);
        dispatch(addToFavoriteDB({userId:userId,bookId:bookId})); 
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  // Add a book to favorites
  const handleAddToFav = async (bookId) => {
    const {userId}= localStorage.getItem('user'); 
    try {
      const response = await axios.post("http://localhost:5000/api/favorites/add", {
        bookId: bookId,
        userId: userId,
      });
      setFavorites((prevFavorites) => [...prevFavorites, response.data]);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const handleRemoveFromFav = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5000/api/favorites/${bookId}`);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.id !== bookId)
      );
    } catch (error) {
      console.error("Error removing from favorites:", error.response?.data || error.message);
    }
  };

  const sampleBooks = [
    { id: 1, title: "Book 1", author: "Author 1", image: bookImage },
    { id: 2, title: "Book 2", author: "Author 2", image: bookImage },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
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
            <Link to="/favourites" className="hover:underline">
              Favorites ({favorites.length})
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
          <p className="mt-4 text-lg">
            Browse thousands of books across various genres
          </p>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sampleBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={book.image || bookImage}
                  alt={book.title}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-700">{book.title}</h3>
                  <p className="text-sm text-gray-500">{book.author}</p>
                  <button
                    onClick={() => handleAddToFav(book.id)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Add to Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} BookApp. All rights reserved.
          </p>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/about" className="hover:underline">
              About
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
