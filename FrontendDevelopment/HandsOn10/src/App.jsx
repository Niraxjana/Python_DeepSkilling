import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import ProfilePage from './pages/ProfilePage';
import CourseDetailPage from './pages/CourseDetailPage';

// ==========================================================================
// TASK 1 - Step 77: App component setting up Route parameters
// ==========================================================================
function App() {
  return (
    <div className="app-container">
      {/* Site Header */}
      <Header siteName="Student Portal" />

      {/* TASK 1 - Step 77: Define routes using Routes and Route */}
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        </Routes>
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}

export default App;
