import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useFeedback } from '../context/FeedbackContext';

const Login = () => {
  const { user, setUser, login } = useFeedback();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginData.email.trim() && loginData.password.trim()) {
      try {
        const user = await login(loginData.email, loginData.password, loginData.role);
        setUser(user);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to Student Feedback System</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
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

        <div className="login-links">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
        
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
