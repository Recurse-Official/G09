const mongoose = require('mongoose');

const completedDeliverySchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'PendingTask', required: true },
    deliveredAt: { type: Date, default: Date.now },
    confirmedByReceiver: { type: Boolean, default: false },
    feedback: { type: String }
  });
  
  module.exports = mongoose.model("CompletedDelivery", completedDeliverySchema);
  