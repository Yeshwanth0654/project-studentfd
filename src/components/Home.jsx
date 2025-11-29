import React from 'react';
import { Link } from 'react-router-dom';
import { useFeedback } from '../context/FeedbackContext';

const Home = () => {
  const { user } = useFeedback();

  // If user is logged in, show a compact dashboard-style page
  if (user) {
    return (
      <div className="home-container">
        <div className="hero-section">
          <h1>Student Feedback System</h1>
          <p className="hero-subtitle">
            {user.role === 'admin'
              ? 'Control forms, courses, and feedback reports.'
              : 'Give feedback and view overall course performance.'
            }
          </p>

          <div className="quick-actions">
            {user.role === 'admin' ? (
              <>
                <Link to="/admin/forms" className="action-card">
                  <h3>📝 Forms</h3>
                  <p>Create and manage feedback forms.</p>
                </Link>
                <Link to="/admin/analytics" className="action-card">
                  <h3>📊 Analytics</h3>
                  <p>See summary reports and trends.</p>
                </Link>
                <Link to="/admin/courses" className="action-card">
                  <h3>🎓 Courses</h3>
                  <p>Manage courses and instructors.</p>
                </Link>
              </>
            ) : (
              <>
                <Link to="/student/feedback" className="action-card">
                  <h3>📝 Give Feedback</h3>
                  <p>Fill feedback for your courses.</p>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // If user is not logged in, show landing page
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Student Feedback & Evaluation System</h1>
        <p className="hero-subtitle">
          A simple way to collect and analyze student feedback.
        </p>

        <div className="features-grid">
          {/* Students Card */}
          <div className="feature-card">
            <h3>🎓 For Students</h3>
            <p>Share your opinion on courses and teaching.</p>
            <ul>
              <li>✔ Quick feedback forms</li>
              <li>✔ Anonymous option</li>
            </ul>
          </div>

          {/* Administrators Card */}
          <div className="feature-card">
            <h3>👨‍🏫 For Administrators</h3>
            <p>Design forms and track feedback in one place.</p>
            <ul>
              <li>✔ Customizable forms</li>
              <li>✔ Basic reports & export</li>
            </ul>
          </div>
        </div>

        <div className="cta-section">
          <Link to="/login" className="cta-button">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
