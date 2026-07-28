import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CourseCard from '../components/CourseCard';
import { 
  fetchAllCourses, 
  selectCourses, 
  selectCoursesLoading, 
  selectCoursesError 
} from '../redux/enrollmentSlice';

// ==========================================================================
// TASK 1 - Step 77: CoursesPage component refactored for Redux Async Thunks
// ==========================================================================
const CoursesPage = () => {
    const dispatch = useDispatch();

    // TASK 2 - Step 146: Consume store values using custom selector functions
    const courses = useSelector(selectCourses);
    const loading = useSelector(selectCoursesLoading);
    const error = useSelector(selectCoursesError);

    // UI-only search query state
    const [searchTerm, setSearchTerm] = useState('');

    // TASK 2 - Step 145: Dispatch the thunk in useEffect, removing inline fetch calls
    useEffect(() => {
        dispatch(fetchAllCourses());
    }, [dispatch]);

    // Local filter operation
    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section id="courses">
            <h2>Available Courses</h2>

            <div className="courses-controls">
                <input
                    type="text"
                    id="search-courses"
                    placeholder="Search courses by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Task 2 - Step 144: Loading state indicator */}
            {loading && <div className="loading-message">Loading courses from API via Thunk...</div>}
            
            {/* Task 2 - Step 144: Error state container */}
            {error && <div className="error-box"><p>⚠️ Failed to load courses: {error}</p></div>}

            {!loading && !error && (
                <div className="course-grid">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map(course => (
                            <CourseCard
                                key={course.id}
                                {...course}
                            />
                        ))
                    ) : (
                        <p className="no-results">No courses match your query: "{searchTerm}"</p>
                    )}
                </div>
            )}
        </section>
    );
};

export default CoursesPage;
