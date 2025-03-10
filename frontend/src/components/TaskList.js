import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Form.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ status: 'All', priority: 'All' });
  const [selectedTask, setSelectedTask] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, { status: 'Completed' });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/tasks/${editTask._id}`, editTask);
      setEditTask(null);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    return (filter.status === 'All' || task.status === filter.status) &&
           (filter.priority === 'All' || task.priority === filter.priority);
  });

  return (
    <div className="task-list-container">
      <div className="filter-panel">
        <h3>Filters</h3>
        <div className="filter-links">
          <p>Status:</p>
          <a href="#" onClick={() => setFilter({ ...filter, status: 'All' })}>All</a>
          <a href="#" onClick={() => setFilter({ ...filter, status: 'Pending' })}>Pending</a>
          <a href="#" onClick={() => setFilter({ ...filter, status: 'Completed' })}>Completed</a>
        </div>
        <div className="filter-links">
          <p>Priority:</p>
          <a href="#" onClick={() => setFilter({ ...filter, priority: 'All' })}>All</a>
          <a href="#" onClick={() => setFilter({ ...filter, priority: 'Low' })}>Low</a>
          <a href="#" onClick={() => setFilter({ ...filter, priority: 'Medium' })}>Medium</a>
          <a href="#" onClick={() => setFilter({ ...filter, priority: 'High' })}>High</a>
        </div>
      </div>
      
      <div className="task-list">
  <h2>Task List</h2>
  <ul>
    {filteredTasks.length > 0 ? (
      filteredTasks.map(task => (
        <li key={task._id} className="task-item">
          <div className="task-content" onClick={() => setSelectedTask(task)}>
            <strong>{task.title}</strong>
            <span>{task.priority} - {task.status}</span>
          </div>
          {/* Buttons row below the task title */}
          <div className="task-actions">
            <button onClick={() => handleMarkAsRead(task._id)}>Mark as Done</button>
            <button onClick={() => setEditTask(task)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </div>
        </li>
      ))
    ) : (
      <p>No tasks available</p>
    )}
  </ul>
</div>

      
      {selectedTask && (
        <div className="task-details">
          <h3>Task Details</h3>
          <p><strong>Title:</strong> {selectedTask.title}</p>
          <p><strong>Description:</strong> {selectedTask.description}</p>
          <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
          <p><strong>Priority:</strong> {selectedTask.priority}</p>
          <p><strong>Status:</strong> {selectedTask.status}</p>
          <button onClick={() => setSelectedTask(null)}>Close</button>
        </div>
      )}
      
      {editTask && (
        <div className="task-edit">
          <h3>Edit Task</h3>
          <form onSubmit={handleEdit}>
            <input 
              type="text" 
              value={editTask.title} 
              onChange={(e) => setEditTask({ ...editTask, title: e.target.value })} 
            />
            <textarea 
              value={editTask.description} 
              onChange={(e) => setEditTask({ ...editTask, description: e.target.value })} 
            />
            <select 
              value={editTask.priority} 
              onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <button type="submit">Save</button>
            <button onClick={() => setEditTask(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskList;