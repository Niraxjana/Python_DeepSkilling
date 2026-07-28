import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { enroll, selectEnrolledCourses } from '../redux/enrollmentSlice';
import { getCourseById } from '../api/courseApi';

// ==========================================================================
// TASK 1 - Step 142: Update component to use centralised API functions
// ==========================================================================
const CourseDetailPage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // TASK 2 - Step 146: Read state using selector instead of direct store shape access
    const enrolledCourses = useSelector(selectEnrolledCourses);
    const isEnrolled = enrolledCourses.includes(parseInt(courseId, 10));

    useEffect(() => {
        setLoading(true);
        // Step 142: Use getCourseById instead of inline fetch()
        getCourseById(courseId)
            .then(mappedCourse => {
                setCourse(mappedCourse);
                setLoading(false);
            })
            .catch(err => {
                // Interceptor returns standard error details (message, statusCode)
                setError(err.message || 'An error occurred loading course details.');
                setLoading(false);
            });
    }, [courseId]);

    const handleEnroll = () => {
        if (course && !isEnrolled) {
            dispatch(enroll(course.id));
            navigate('/profile');
        }
    };

    if (loading) return <div className="loading-message">Loading course details...</div>;
    if (error) return (
        <div className="error-box" style={{ maxWidth: '800px', margin: '40px auto' }}>
            <p>⚠️ {error}</p>
            <Link to="/courses" className="explore-btn" style={{ marginTop: '10px' }}>Back to Courses</Link>
        </div>
    );

    return (
        <section className="course-detail-section" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Course Detail Directory</h2>
            {course && (
                <div className="profile-card-display" style={{ textAlign: 'left', alignItems: 'flex-start', padding: '30px', margin: '20px 0' }}>
                    <h3 style={{ textTransform: 'capitalize' }}>{course.name}</h3>
                    <p>Course Code: <strong>{course.code}</strong></p>
                    <p>Credits: <strong>{course.credits} Credits</strong></p>
                    <p>Suggested Grade: <strong>{course.grade}</strong></p>
                    
                    <div style={{ margin: '20px 0', fontSize: '1rem', color: '#555' }}>
                        <h4>Course Syllabus Outline</h4>
                        <p style={{ border: 'none', padding: '10px 0', textTransform: 'none' }}>{course.description}</p>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '15px', width: '100%', marginTop: '15px' }}>
                        <button 
                            className={`enroll-btn ${isEnrolled ? 'enrolled' : ''}`}
                            onClick={handleEnroll}
                            disabled={isEnrolled}
                            style={{ flex: 1 }}
                        >
                            {isEnrolled ? 'Enrolled ✓' : 'Enroll in Course'}
                        </button>
                        <Link to="/courses" className="explore-btn" style={{ background: 'white', color: '#1f4e79', flex: 1, textAlign: 'center' }}>
                            Back to Courses
                        </Link>
                    </div>
                </div>
            )}
        </section>
    );
};

export default CourseDetailPage;
