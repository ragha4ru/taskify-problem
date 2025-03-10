import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Form.css';

const AddTask = () => {
  const [task, setTask] = useState({ title: '', description: '', dueDate: '', priority: 'Low', status: 'Pending' });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/tasks', task);
    setTask({ title: '', description: '', dueDate: '', priority: 'Low', status: 'Pending' });
  };

  return (
    <div className="form-container">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={task.title} onChange={handleChange} required />
        
        <label>Due Date:</label>
        <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} required />
        
        <label>Description:</label>
        <textarea name="description" value={task.description} onChange={handleChange}></textarea>
        
        <label>Priority:</label>
        <select name="priority" value={task.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        
        <label>Status:</label>
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;