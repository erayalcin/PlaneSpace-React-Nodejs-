// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home.js'; // Ana sayfa bileşeni

import Flights from './pages/Flights';

const App = () => {
  return (
    <Router>
    <div>
      {/* Navigasyon bağlantıları */}
      

      {/* Sayfalar arası yönlendirme */}
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/pages/Home" element={<Home />} />
        <Route path="/pages/Flights" element={<Flights />} />
      </Routes>
    </div>
  </Router>
  );
};

export default App;