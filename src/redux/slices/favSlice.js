import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch favorites from the database
export const fetchFavoritesDB = createAsyncThunk(
  "favorites/fetchFavoritesDB",
  async (userId) => {
    const response = await axios.get("/api/favourites/fetch",{

         userId:userId
        });
    return response.data;
  });

// Add a book to favorites
export const addToFavoriteDB = createAsyncThunk(
  "favorites/addToFavoriteDB",
  async ({userId,bookId}) => {
    const response = await axios.post("/api/favourites", {
      userId: userId,
      bookId: bookId,
    });
    return response.data;
  }
);

export const removeFavoriteDB = createAsyncThunk(
  "favorites/removeFavoriteDB",
  async ( id ) => {
    try {
      const response = await axios.delete(`/api/favourites/remove/${id}`, {
        params: { userId:'123' },
      });
      return response.data;
    } catch (error) {
      console.error("Error removing from favorites:", error);
      throw error;
    }
  }
);


// Update a book in favorites
export const updateFavoriteDB = createAsyncThunk(
  "favorites/updateFavoriteDB",
  async ({ id, book }) => {
    const response = await axios.put(`/api/favourites/update/${id}`, book);
    return response.data;
  }
);

const favSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesDB.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavoritesDB.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavoritesDB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToFavoriteDB.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      })
      .addCase(removeFavoriteDB.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          (fav) => fav._id !== action.payload
        );
      })
      .addCase(updateFavoriteDB.fulfilled, (state, action) => {
        const index = state.favorites.findIndex(
          (fav) => fav._id === action.payload._id
        );
        if (index !== -1) {
          state.favorites[index] = action.payload;
        }
      });
  },
});

export default favSlice.reducer;

