import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  const addToFavourites = (book) => {
    if (favourites.find((fav) => fav.id === book.id)) {
      toast.error(`${book.title} is already in favourites!`);
    } else {
      setFavourites([...favourites, book]);
      toast.success(`${book.title} added to favourites!`);
    }
  };

  // Sample book data
  const books = [
    {
      id: 1,
      title: "Book 1",
      author: "Author 1",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Book 2",
      author: "Author 2",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Book 3",
      author: "Author 3",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "Book 4",
      author: "Author 4",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      title: "Book 5",
      author: "Author 5",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <li key={book.id} className="bg-white shadow rounded p-4 flex items-center">
            <img
              src={book.image}
              alt={book.title}
              className="w-16 h-16 object-cover rounded mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
              <button
                onClick={() => addToFavourites(book)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add to Favourites
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mt-8 mb-4">Favourites</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favourites.map((fav) => (
          <li key={fav.id} className="bg-white shadow rounded p-4 flex items-center">
            <img
              src={fav.image}
              alt={fav.title}
              className="w-16 h-16 object-cover rounded mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold">{fav.title}</h3>
              <p className="text-sm text-gray-600">{fav.author}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favourites;
