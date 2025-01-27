import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

//const API_URL = "http://localhost:5000";

const AddBookPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post(`${API_URL}/books`, book);
        alert('Book added successfully!');
    } catch (error) {
        console.error("Error adding book:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Add Navbar */}
      <Navbar />

      {/* Form Section */}
      <div className="flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mt-10">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Add a New Book
          </h2>
          <form onSubmit={handleFormSubmit}>
            {/* Title */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium mb-2"
              >
                Book Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter book title"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Author */}
            <div className="mb-4">
              <label
                htmlFor="author"
                className="block text-gray-700 font-medium mb-2"
              >
                Author
              </label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author's name"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a short description"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="4"
                required
              />
            </div>

            {/* Cover Image */}
            <div className="mb-4">
              <label
                htmlFor="coverImage"
                className="block text-gray-700 font-medium mb-2"
              >
                Cover Image
              </label>
              <input
                id="coverImage"
                type="file"
                accept="image/*"
                onChange={(e) => setCoverImage(e.target.files[0])}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
            >
              Add Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookPage;
