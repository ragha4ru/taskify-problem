import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded }) => {
  const [task, setTask] = useState({ title: '', description: '', dueDate: '', priority: 'Low', status: 'Pending' });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/tasks', task);
    onTaskAdded();
    setTask({ title: '', description: '', dueDate: '', priority: 'Low', status: 'Pending' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={task.title} onChange={handleChange} placeholder="Title" required />
      <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} />
      <textarea name="description" value={task.description} onChange={handleChange} placeholder="Description"></textarea>
      <select name="priority" value={task.priority} onChange={handleChange}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <select name="status" value={task.status} onChange={handleChange}>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;