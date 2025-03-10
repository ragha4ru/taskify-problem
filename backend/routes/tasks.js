const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.post('/', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating task' });
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  const mongoose = require('mongoose');

  const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    dueDate: String,
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  });
  
  module.exports = mongoose.models.Task || mongoose.model('Task', TaskSchema);
  
module.exports = router;