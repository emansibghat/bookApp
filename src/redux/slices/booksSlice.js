import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to fetch books
export const getBooks = createAsyncThunk(
    "books/get",
    async ({ searchTerm, maxResults = 10, startIndex = 0 }) => {
      try {
        const { data } = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=${maxResults}&startIndex=${startIndex}`
        );
        return data.items; // Return only the books array from the response
      } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
      }
    }
  );
  

export const booksSlice = createSlice({
  name: "books",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {}, // No manual reducers needed for this case
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Assign fetched books to state.books
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default booksSlice.reducer;
