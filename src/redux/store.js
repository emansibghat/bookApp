import { configureStore } from "@reduxjs/toolkit";
import favouriteReducer from "./slices/favSlice";
import booksReducer from "./slices/booksSlice";

const store = configureStore({
  reducer: {
    favorites: favouriteReducer,
    books: booksReducer,
  },
});

export default store;
