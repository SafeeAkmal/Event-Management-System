import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import EventListPage from './features/events/EventListPage';
import EventDetailPage from './features/events/EventDetailPage';
import MyEventsPage from './features/registrations/MyEventsPage';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/events" replace />} />
          
          {/* Public Routes */}
          <Route path="/events" element={<EventListPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/my-events" element={<MyEventsPage />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;