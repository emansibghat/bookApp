import React from "react";
import { Link } from "react-router-dom";
import bookImage from "./book.png"; 

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-blue-700 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">BookApp</h1>
          <nav className="space-x-6">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/categories" className="hover:underline">
              Categories
            </Link>
            <Link to="/favorites" className="hover:underline">
              Favorites
            </Link>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
          </nav>
          <div>
            <input
              type="text"
              placeholder="Search books..."
              className="px-4 py-2 rounded focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[400px] bg-cover bg-center text-white" style={{ backgroundImage: `url(${bookImage})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold">Discover Your Next Favorite Book</h2>
          <p className="text-lg mt-4">Browse thousands of books across various genres</p>
          <Link
            to="/AddBookPage"
            className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded text-white font-bold"
          >
            Add Books
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Fiction", "Non-Fiction", "Mystery", "Adventure", "Sci-Fi", "Fantasy"].map((category) => (
              <div
                key={category}
                className="bg-blue-100 hover:bg-blue-200 text-center p-6 rounded shadow-lg cursor-pointer"
              >
                <h3 className="text-lg font-bold">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Books</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array(8)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded overflow-hidden transform hover:scale-105 transition"
                >
                  <img
                    src={bookImage}
                    alt="Book Cover"
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-700">Book Title {index + 1}</h3>
                    <p className="text-sm text-gray-500">Author Name</p>
                    <div className="mt-4">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Add to Favorites
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 BookApp. All Rights Reserved.</p>
          <p>
            <Link to="/about" className="hover:underline">
              About Us
            </Link>{" "}
            |{" "}
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>{" "}
            |{" "}
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
