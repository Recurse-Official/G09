const mongoose = require('mongoose');

const availableTaskSchema = new mongoose.Schema({
    foodRequestId: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodRequest', required: true },
    sender: {
      name: String,
      address: String
    },
    receiver: {
      name: String,
      address: String
    },
    foodDetails: {
      foodName: String,
      serves: Number
    },
    status: { type: String, enum: ['Available', 'Accepted'], default: 'Available' }
  });
  
  module.exports = mongoose.model("AvailableTask", availableTaskSchema);
  