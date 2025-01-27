import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from 'react-hot-toast';
import './App.css';
import HomePage from "./components/pages/HomePage";
import AddBookPage from "./components/pages/AddBookPage";
import Favourites from "./components/pages/favourites";
import ProfilePage from "./components/pages/ProfilePage";
import store from './redux/store';
import Login from "./components/pages/login";
import SignUp from "./components/pages/signup";

function App() {
  return (
   
   <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Toaster />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/ProfilePage" element={<ProfilePage />} />
            <Route path="/AddBookPage" element={<AddBookPage />} />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
      </Provider>
      
   
  );
}

export default App;
