// server.js

const express = require('express');
const cors = require('cors'); // CORS paketini içe aktarın
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require('./db');

const Flight = require('./models/Flight');

const app = express();
const PORT = process.env.PORT || 5001; // Port numarasını 5001 olarak değiştirin
app.use(cors());
// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// API Routes
// Add a flight
app.post('/api/flights', async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).json(flight);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all flights
app.get('/api/flights', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
