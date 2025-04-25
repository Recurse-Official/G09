const mongoose = require('mongoose');

const foodAvailableSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  foodName: { type: String, required: true, unique: true },
  serves: { type: Number, required: true },
  expiry: {
    days: { type: Number, default: 0 },
    hours: { type: Number, default: 0 }
  },
  address: {
    street: String,
    city: String,
    pincode: String,
    latitude: Number,
    longitude: Number
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("FoodAvailable", foodAvailableSchema);

