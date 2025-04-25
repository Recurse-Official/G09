const express = require('express');
const router = express.Router();
const FoodRequest = require('../models/FoodRequest');

// POST /api/request/:foodId - NGO requests a meal
router.post('/:foodId', async (req, res) => {
  try {
    const { foodId } = req.params;
    const newRequest = new FoodRequest({
      ...req.body,
      foodId: foodId
    });
    await newRequest.save();
    res.status(201).json({ message: 'Request submitted', request: newRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit request' });
  }
});

// GET /api/request/all - View all food requests
router.get('/all', async (req, res) => {
  try {
    const requests = await FoodRequest.find().populate('foodId');
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching requests' });
  }
});

module.exports = router;