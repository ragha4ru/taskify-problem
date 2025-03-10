const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/tasks');  // Import task routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);  // Ensure this line is present only once

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.listen(5000, () => console.log('Server running on port 5000'));
