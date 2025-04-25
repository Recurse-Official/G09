const express = require('express');
const router = express.Router();
const AvailableTask = require('../models/AvailableTask');
const PendingTask = require('../models/PendingTask');

// GET /api/volunteer/tasks - Get all available tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await AvailableTask.find({ status: 'Available' });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// POST /api/volunteer/accept/:taskId - Accept a task
router.post('/accept/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const acceptedTask = new PendingTask({
      taskId: taskId,
      ...req.body
    });
    await acceptedTask.save();

    await AvailableTask.findByIdAndUpdate(taskId, { status: 'Accepted' });

    res.status(201).json({ message: 'Task accepted', pending: acceptedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to accept task' });
  }
});

module.exports = router;