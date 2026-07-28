import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEnrolledCourses } from '../redux/enrollmentSlice';

// TASK 2 - Step 83: Import hooks to consume Context API if preferred
// import { useContext } from 'react';
// import { EnrollmentContext } from '../context/EnrollmentContext';

// ==========================================================================
// TASK 1 - Step 78: Header using Link navigation
// TASK 2 - Step 83 & TASK 3 - Step 89: Consume global state for badge count
// ==========================================================================
const Header = ({ siteName }) => {
    // TASK 3 - Step 89 & TASK 2 - Step 146: Consume global state using selector
    const enrolledCourses = useSelector(selectEnrolledCourses);

    // TASK 2 - Step 83: Context API alternative (uncomment to use Context instead)
    // const { enrolledCourses } = useContext(EnrollmentContext);

    return (
        <header className="header">
            {/* Prevents page reload on title click */}
            <h2>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                    {siteName}
                </Link>
            </h2>
            
            <div className="hamburger">☰ Menu</div>
            
            <nav id="nav-menu" style={{ display: 'block', width: 'auto' }}>
                <ul>
                    {/* TASK 1 - Step 78: Update the Header nav links to use Link instead of a tags */}
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                </ul>
            </nav>

            <div className="enrolled-badge">
                Enrolled: <strong>{enrolledCourses.length}</strong>
            </div>
        </header>
    );
};

export default Header;
