// models/Flight.js
const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
   
  },
  departureName: {
    type: String,
    required: true,
  },
  arrivalName: {
    type: String,
    required: true,
  },
  departureDate: {
    type: String,
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  departureAirport: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  arrivalAirport: {
    type: String,
    required: true,
  },
  flightDuration: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const Flight = mongoose.model('Flight', FlightSchema);

module.exports = Flight;
