import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';               // Dashboard
import Login from './Login';
import Register from './Register';
import Home from './components/Home'; // ✅ Correct path to Home
import reportWebVitals from './reportWebVitals';

// ✅ Grab token from URL and store it in localStorage BEFORE rendering anything
const params = new URLSearchParams(window.location.search);
const token = params.get('token');
if (token) {
  localStorage.setItem('token', token);
  // ✅ Clean up URL (removes ?token=... from browser bar)
  window.history.replaceState({}, document.title, window.location.pathname);
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
