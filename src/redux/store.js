import { configureStore } from '@reduxjs/toolkit';
import favouriteReducer from './slices/favSlice'; // adjust the path as per your file structure

const store = configureStore({
  reducer: {
    favorites: favouriteReducer, // 'favorites' is the name you gave to your slice
  },
});

export default store;
