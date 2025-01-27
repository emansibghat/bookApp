import { createSlice } from "@reduxjs/toolkit";
//import {favouriteSlice} from "./slices/favSlice"

const booksSlice = createSlice({
    name: "books",
    initialState: {
        books: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchBooksStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchBooksSuccess: (state, action) => {
            state.books = action.payload;
            state.loading = false;
        },
        fetchBooksFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { fetchBooksStart, fetchBooksSuccess, fetchBooksFailure } = booksSlice.actions;