import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useFeedback } from '../context/FeedbackContext';

const Login = () => {
  const { user, setUser } = useFeedback();
  const [loginData, setLoginData] = useState({
    username: '',
    role: 'student'
  });

  // If user is already logged in, redirect to appropriate dashboard
  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginData.username.trim()) {
      // Simple authentication - in a real app, this would be validated against a backend
      const newUser = {
        id: Date.now().toString(),
        name: loginData.username,
        role: loginData.role
      };
      setUser(newUser);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to Student Feedback System</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Name:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={loginData.username}
              onChange={handleInputChange}
              required
              placeholder="Enter your name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              value={loginData.role}
              onChange={handleInputChange}
            >
              <option value="student">Student</option>
              <option value="admin">Administrator/Teacher</option>
            </select>
          </div>
          
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        
        <div className="login-info">
          <p><strong>Demo Instructions:</strong></p>
          <p>• Select "Student" to access feedback forms and view results</p>
          <p>• Select "Administrator/Teacher" to create forms and view analytics</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
