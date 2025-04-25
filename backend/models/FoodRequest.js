const mongoose = require('mongoose');

const foodRequestSchema = new mongoose.Schema({
    foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodAvailable', required: true },
    requesterName: { type: String, required: true },
    requesterType: { type: String, enum: ['NGO', 'OldAgeHome', 'Orphanage'], required: true },
    location: {
      latitude: Number,
      longitude: Number,
      address: String
    },
    requestedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['Requested', 'Accepted', 'Delivered'], default: 'Requested' }
  });
  
  module.exports = mongoose.model("FoodRequest", foodRequestSchema);
  