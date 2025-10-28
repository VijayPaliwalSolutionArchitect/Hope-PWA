import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Public pages
import HomePage from './pages/HomePage';
import BlogsPage from './pages/BlogsPage';
import BlogDetailPage from './pages/BlogDetailPage';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogManager from './pages/admin/BlogManager';
import TestimonialsManager from './pages/admin/TestimonialsManager';
import InquiriesManager from './pages/admin/InquiriesManager';
import SettingsManager from './pages/admin/SettingsManager';
import EmailTemplatesManager from './pages/admin/EmailTemplatesManager';
import ExceptionsManager from './pages/admin/ExceptionsManager';
import LogsManager from './pages/admin/LogsManager';
import HealthMonitor from './pages/admin/HealthMonitor';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/blog/:slug" element={<BlogDetailPage />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/blogs"
        element={
          <ProtectedRoute>
            <BlogManager />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/testimonials"
        element={
          <ProtectedRoute>
            <TestimonialsManager />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/inquiries"
        element={
          <ProtectedRoute>
            <InquiriesManager />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute>
            <SettingsManager />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/email-templates"
        element={
          <ProtectedRoute>
            <EmailTemplatesManager />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/exceptions"
        element={
          <ProtectedRoute>
            <ExceptionsManager />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/logs"
        element={
          <ProtectedRoute>
            <LogsManager />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/health"
        element={
          <ProtectedRoute>
            <HealthMonitor />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
