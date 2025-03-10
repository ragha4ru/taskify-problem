import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">Task List</Link>
        <Link to="/add-task">New Task</Link>
      </div>
    </nav>
  );
};

export default Navbar;