import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  unenroll, 
  fetchAllCourses, 
  selectCourses, 
  selectEnrolledCourses 
} from '../redux/enrollmentSlice';
import StudentProfile from '../components/StudentProfile';

// ==========================================================================
// TASK 1 - Step 142: Update component to use centralised store data
// ==========================================================================
const ProfilePage = () => {
    const dispatch = useDispatch();

    // TASK 2 - Step 146: Read state using selectors
    const enrolledIds = useSelector(selectEnrolledCourses);
    const allCourses = useSelector(selectCourses);

    // Fetch courses on mount to populate details if not already loaded in store
    useEffect(() => {
        dispatch(fetchAllCourses());
    }, [dispatch]);

    // Resolve course details matching the enrolled IDs
    const enrolledDetails = allCourses.filter(c => enrolledIds.includes(c.id));

    const handleRemove = (courseId) => {
        dispatch(unenroll(courseId));
    };

    return (
        <div className="profile-page-container">
            {/* Student Profile Component (HO5 Task 3 Step 74) */}
            <StudentProfile />

            {/* Enrolled Courses Dashboard */}
            <section id="enrolled-courses-dashboard" style={{ padding: '30px 20px', maxWidth: '1200px', margin: '0 auto' }}>
                <h2>Your Enrolled Courses</h2>
                
                {enrolledDetails.length === 0 ? (
                    <p className="no-results" style={{ border: '1px dashed #ccc', borderRadius: '10px' }}>
                        You are not currently enrolled in any courses. Browse available courses to register!
                    </p>
                ) : (
                    <div className="course-grid">
                        {enrolledDetails.map(course => (
                            <article key={course.id} className="course-card" style={{ minHeight: '160px' }}>
                                <div className="course-card-details">
                                    <h3>{course.name}</h3>
                                    <p>Code: <strong>{course.code}</strong></p>
                                    <span>Credits : {course.credits}</span>
                                </div>
                                
                                <button 
                                    type="button" 
                                    className="enroll-btn"
                                    onClick={() => handleRemove(course.id)}
                                    style={{ background: '#dc3545', borderColor: '#dc3545' }}
                                >
                                    Un-enroll / Remove
                                </button>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default ProfilePage;
