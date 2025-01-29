import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import axios from "axios";
import bookImage from "./book.png";
 import Books from "./booknew.png";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../redux/slices/booksSlice";
import { addToFavoriteDB } from "../../redux/slices/favSlice";

const HomePage = () => {
  const MAX_BOOKS_COUNT = 10;
  const searchTerm = useRef("");
  const { data, loading, error } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const books = data?.items || [];
  const [startIndex, setStartIndex] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Fetch favorites from the database
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/favorites/fetch");
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        alert("Failed to load favorites. Please try again later.");
      }
    };
    fetchFavorites();
  }, []);

  // Add a book to favorites
  const handleAddToFav = async (bookId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;

    if (!userId) {
      alert("Please log in to add books to your favorites.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/favorites/add", { bookId, userId });
      setFavorites((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Failed to add to favorites. Please try again later.");
    }
  };

  // Search functionality
  const handleSearch = async (event) => {
    event.preventDefault();
    const searchValue = searchTerm.current.value.trim();
    if (!searchValue) {
      alert("Search term cannot be empty");
      return;
    }

    dispatch(
      getBooks({
        searchTerm: encodeURIComponent(searchValue),
        maxResult: MAX_BOOKS_COUNT,
        startIndex,
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-700 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">BookApp</h1>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/categories" className="hover:underline">Categories</Link>
            <Link to="/favourites" className="hover:underline">Favorites ({favorites.length || 0})</Link>
            <Link to="/ProfilePage" className="hover:underline">Profile</Link>
          </nav>
          <button onClick={toggleMenu} className="focus:outline-none md:hidden">
            <FaEllipsisV className="text-2xl" />
          </button>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative h-[750px] bg-cover bg-center" style={{ backgroundImage: `url(${Books})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-4">
          <h2 className="text-4xl font-bold">Discover Your Next Favorite Book</h2>
          <p className="mt-4 text-lg">Browse thousands of books across various genres</p>
          <Link to="/AddBookPage" className="mt-6 bg-blue-500 px-6 py-3 rounded font-bold hover:bg-blue-600">Add Books</Link>
        </div>
      </section>

      {/* Search Section */}
      <div className="container mx-auto px-4 py-6">
        <form className="flex space-x-4 mb-6" onSubmit={handleSearch}>
          <input ref={searchTerm} type="text" placeholder="Search Google Books" className="flex-1 p-2 border rounded" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Search</button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {books.map((book) => (
            <div key={book.id} className="bg-white p-4 shadow rounded hover:shadow-lg transition">
              <Link to={`/book/${book.id}`}>
                <img src={book.volumeInfo.imageLinks.thumbnail || bookImage} alt={book.volumeInfo?.title} className="h-40 w-full object-cover mb-2" />
              </Link>
              <button onClick={() => handleAddToFav(book.id)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Favorites</button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} BookApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
