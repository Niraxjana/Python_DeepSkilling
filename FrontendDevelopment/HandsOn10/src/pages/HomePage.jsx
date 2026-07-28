import React from 'react';
import { Link } from 'react-router-dom';

// ==========================================================================
// TASK 1 - Step 77: Renders HomePage at route "/"
// ==========================================================================
const HomePage = () => {
    return (
        <section id="hero" style={{ minHeight: '50vh', justifyContent: 'center' }}>
            <h1>Welcome to the Student Portal</h1>
            <p>
                An interactive Single Page Application directory built with React Router and Redux Toolkit.
            </p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <Link to="/courses" className="explore-btn">Browse Courses</Link>
                <Link to="/profile" className="explore-btn" style={{ background: 'white', color: '#1f4e79' }}>View Profile</Link>
            </div>
        </section>
    );
};

export default HomePage;
