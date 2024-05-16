import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CategoryTree from './components/CategoryTree';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleSetToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={handleSetToken} />} />
        <Route path="/categories" element={token ? <CategoryTree token={token} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
