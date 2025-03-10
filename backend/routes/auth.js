const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
      const token = jwt.sign({ id: "fakeUserId" }, 'secret', { expiresIn: '1h' });
      res.json({ token, user: { id: "fakeUserId", name: "Test User", email: "test@gmail.com" } });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Ensure password is hashed
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
  
      res.status(201).json({ message: 'User registered successfully' });
  
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
module.exports = router;
