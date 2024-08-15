// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home.js'; // Ana sayfa bileşeni

import Flights from './pages/Flights';
import Test from './pages/test';
import Test1 from './pages/test1';

const App = () => {
  const [flightData, setFlightData] = useState({
    departureName: '',
    arrivalName: '',
    departureDate: '',
    departureTime: '',
    departureAirport: '',
    arrivalTime: '',
    arrivalAirport: '',
    flightDuration: '',
    price: '',
  });
  return (
    <Router>
    <div>
      {/* Navigasyon bağlantıları */}
      

      {/* Sayfalar arası yönlendirme */}
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/pages/Home" element={<Home />} />
        <Route path="/pages/Flights" element={<Flights  />} />
        <Route path="/pages/test" element={<Test flightData={flightData}/>} />
        <Route path="/pages/test1" element={<Test1 />} />
      </Routes>
    </div>
  </Router>
  );
};

export default App;