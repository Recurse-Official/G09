const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const restaurantRoutes = require('./routes/restaurantRoutes');
const requestRoutes = require('./routes/requestRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/volunteer', volunteerRoutes);
app.use('/api/delivery', deliveryRoutes);

// MongoDB Connection
connectDB(); // Connects to MongoDB

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
