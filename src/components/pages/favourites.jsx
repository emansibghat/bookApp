import React, { useEffect, useState } from "react";
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
  const [favItems, setFavItems] = useState(1)

  useEffect(() => {
    dispatch(fetchFavoritesDB());
  }, [dispatch]);

  const handleRemoveFromFav = (id) => {
    dispatch(removeFavoriteDB(id));
    window.location.reload()
  };

  const handleIncrementFavCount = () => {
    setFavItems(favItems + 1)
  };

  const handleDecrementFavCount = () => {
    if (favItems > 1) {
      setFavItems(favItems -1)
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
          favorites.map((favorite) => (
            <div key={favorite._id} className="border p-4 mb-4 flex items-center gap-4 bg-white rounded-lg shadow">
              <img
                src={favorite.bookId.coverImage}
                alt={favorite.bookId.title}
                className="w-32 h-40 object-cover rounded"
              />
              <div>
                <h2 className="text-xl font-semibold">{favorite.bookId.title}</h2>
                <p className="text-gray-600">Author: {favorite.bookId.author}</p>
                <p className="text-gray-600 mt-2">{favorite.bookId.description}</p>
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => handleIncrementFavCount()}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    +
                  </button>
                  <span className="mx-2">Count: {favItems}</span>
                  <button
                    onClick={() => handleDecrementFavCount()}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleRemoveFromFav(favorite.bookId._id)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </main>
      <footer className="p-4 bg-gray-800 text-white text-center"></footer>
    </div>
  );
}
export default FavouritesPage
