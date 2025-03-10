import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:5000/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(data);
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    await axios.put('http://localhost:5000/auth/update', user, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Profile updated');
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <input type="text" name="name" value={user.name} onChange={handleChange} />
      <input type="email" name="email" value={user.email} readOnly />
      <input type="password" name="password" placeholder="New Password" onChange={handleChange} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default Profile;