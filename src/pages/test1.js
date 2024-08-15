// FlightList.js
import React, { useEffect, useState } from 'react';

const FlightList = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      const response = await fetch('http://localhost:5001/api/flights');
      const data = await response.json();
      setFlights(data);
    };

    fetchFlights();
  }, []);

  return (
    <ul>
      {flights.map((flight) => (
        <li key={flight._id}>
          {flight.departureName} to {flight.arrivalName} at {flight.departureTime}
        </li>
      ))}
    </ul>
  );
};

export default FlightList;