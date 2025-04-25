const express = require('express');
const router = express.Router();
const CompletedDelivery = require('../models/CompletedDelivery');
const PendingTask = require('../models/PendingTask');

// POST /api/delivery/confirm/:taskId - Confirm a delivery
router.post('/confirm/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;

    const completed = new CompletedDelivery({
      taskId: taskId,
      ...req.body
    });
    await completed.save();

    await PendingTask.findByIdAndUpdate(taskId, { deliveryStatus: 'Delivered' });

    res.status(201).json({ message: 'Delivery confirmed', data: completed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to confirm delivery' });
  }
});

module.exports = router;