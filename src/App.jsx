import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from 'react-hot-toast';
import './App.css'

import HomePage from "./components/pages/HomePage";
import AddBookPage from "./components/pages/AddBookPage";
import Favourites from "./components/pages/favourites";
import ProfilePage from "./components/pages/ProfilePage";
import BookDetailsPage from "./components/pages/BookDetailsPage";
import Login from "./components/pages/login";
import SignUp from "./components/pages/signup";

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favourites />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/AddBookPage" element={<AddBookPage />} />
          <Route path="/BookDetailsPage" element={<BookDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App


