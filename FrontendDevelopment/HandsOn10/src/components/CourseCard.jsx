import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { enroll, selectEnrolledCourses } from '../redux/enrollmentSlice';

// TASK 2 - Step 83: Context API imports (alternative approach)
// import { useContext } from 'react';
// import { EnrollmentContext } from '../context/EnrollmentContext';

// ==========================================================================
// TASK 1 - Step 77 & 80: Routing & useNavigate hook on Enroll
// TASK 3 - Step 88 & 89: Redux Action dispatch on Enroll
// ==========================================================================
const CourseCard = ({ id, name, code, credits, grade }) => {
    const dispatch = useDispatch();
    
    // TASK 1 - Step 80: Set up useNavigate hook
    const navigate = useNavigate();

    // TASK 3 - Step 89 & TASK 2 - Step 146: Read enrollment state via selector
    const enrolledCourses = useSelector(selectEnrolledCourses);
    const isEnrolled = enrolledCourses.includes(id);

    // TASK 2 - Step 83: Context API alternative
    // const { enrolledCourses, enroll } = useContext(EnrollmentContext);
    // const isEnrolled = enrolledCourses.includes(id);

    const handleEnrollClick = (e) => {
        e.preventDefault(); // Prevents triggers from outer container links
        e.stopPropagation();

        if (!isEnrolled) {
            // TASK 3 - Step 88: Dispatch Redux enroll action (Payload: course ID)
            dispatch(enroll(id));

            // TASK 2 - Step 83 Context API alternative:
            // enroll(id);

            // TASK 1 - Step 80: Navigate the user to /profile automatically after enrolling
            navigate('/profile');
        }
    };

    return (
        <article className="course-card">
            {/* TASK 1 - Step 77: Navigate to course details page */}
            <Link to={`/courses/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="course-card-details">
                    <h3>{name}</h3>
                    <p>Code: <strong>{code}</strong></p>
                    <p>Grade: <strong>{grade}</strong></p>
                    <span>Credits : {credits}</span>
                </div>
            </Link>

            <button 
                type="button"
                className={`enroll-btn ${isEnrolled ? 'enrolled' : ''}`}
                onClick={handleEnrollClick}
                disabled={isEnrolled}
            >
                {isEnrolled ? 'Enrolled ✓' : 'Enroll'}
            </button>
        </article>
    );
};

export default CourseCard;
