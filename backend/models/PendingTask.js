const mongoose = require('mongoose');

const pendingTaskSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'AvailableTask', required: true },
    volunteerName: { type: String, required: true },
    volunteerContact: { type: String },
    acceptedAt: { type: Date, default: Date.now },
    deliveryStatus: { type: String, enum: ['Pending', 'Delivered'], default: 'Pending' }
  });
  
  module.exports = mongoose.model("PendingTask", pendingTaskSchema);
  