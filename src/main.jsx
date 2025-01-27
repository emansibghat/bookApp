import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client' for React 18
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store'; // Ensure the correct path to store.js

// Create the root element and render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
