const express = require('express');
const router = express.Router();
const FoodAvailable = require('../models/FoodAvailable');

// POST /api/restaurant/post - Add a food item
router.post('/post', async (req, res) => {
  try {
    const newFood = new FoodAvailable(req.body);
    await newFood.save();
    res.status(201).json({ message: 'Food posted successfully', food: newFood });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error posting food' });
  }
});

// GET /api/restaurant/all - Get all available food
router.get('/all', async (req, res) => {
  try {
    const foods = await FoodAvailable.find();
    res.status(200).json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching food data' });
  }
});

module.exports = router;
