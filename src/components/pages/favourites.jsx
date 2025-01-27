import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFavoritesDB,
  addToFavoriteDB,
  removeFavoriteDB,
  updateFavoriteDB,
} from "../../redux/slices/favSlice";

const FavouritesPage = () => {
  const dispatch = useDispatch();
  const { favorites, loading, error } = useSelector((state) => state.favorites);
  const userId = "123"; 

  useEffect(() => {
    dispatch(fetchFavoritesDB(userId));
  }, [dispatch, userId]);

  const handleRemoveFromFav = (id) => {
    const userId = "123"; 
    dispatch(removeFavoriteDB({ id, userId }));
  };

  const handleAddToFavorite = (book) => {
    dispatch(addToFavoriteDB(book));
  };

  const handleIncrementFavCount = (id, count) => {
    dispatch(updateFavoriteDB({ id, book: { count: count + 1 } }));
  };

  const handleDecrementFavCount = (id, count) => {
    if (count > 1) {
      dispatch(updateFavoriteDB({ id, book: { count: count - 1 } }));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading favorites: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-700 text-white p-4">
        <h1 className="text-2xl">Favorite Books</h1>
      </header>
      <main className="flex-grow p-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading favorites: {error}</p>
        ) : !Array.isArray(favorites) || favorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          favorites.map((book) => (
            <div key={book._id} className="border p-4 mb-4">
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Count: {book.count}</p>
              <button
                onClick={() => handleIncrementFavCount(book._id, book.count)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                +
              </button>
              <button
                onClick={() => handleAddToFavorite(book)}
                className="bg-green-500 text-white px-2 py-1 rounded mx-2"
              ></button>
              <button
                onClick={() => handleDecrementFavCount(book._id, book.count)}
                className="bg-red-500 text-white px-2 py-1 rounded mx-2"
              >
                -
              </button>
              <button
                onClick={() => handleRemoveFromFav(book._id)}
                className="bg-gray-500 text-white px-2 py-1 rounded"
              >
                Remove from Favorites
              </button>
            </div>
          ))
        )}
      </main>
      <footer className="p-4 bg-gray-800 text-white text-center"></footer>
    </div>
  );
}
export default FavouritesPage
