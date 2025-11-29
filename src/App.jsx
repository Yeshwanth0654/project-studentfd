import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FeedbackProvider, useFeedback } from './context/FeedbackContext';

// Components
import Home from './components/Home';
import Login from './components/Login';
import Reg from './components/Reg';
import Navigation from './components/Navigation';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import AdminForms from './components/admin/AdminForms';
import AdminAnalytics from './components/admin/AdminAnalytics';
import AdminCourses from './components/admin/AdminCourses';
import AdminUsers from './components/admin/AdminUsers';

// Student Components
import StudentDashboard from './components/student/StudentDashboard';
import StudentFeedback from './components/student/StudentFeedback';
import StudentResults from './components/student/StudentResults';

// Import styles
import './styles/FeedbackSystem.css';

// Protected Route component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useFeedback();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Additional security: prevent students from accessing admin routes
    if (requiredRole === 'admin' && user.role === 'student') {
      return <Navigate to="/student" replace />;
    }
    return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />;
  }

  return children;
};

function AppContent() {
  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Reg />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/forms"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminForms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminAnalytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminUsers />
              </ProtectedRoute>
            }
          />

          {/* Student Routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/feedback"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentFeedback />
              </ProtectedRoute>
            }
          />


          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <FeedbackProvider>
        <AppContent />
      </FeedbackProvider>
    </Router>
  );
}

export default App;
