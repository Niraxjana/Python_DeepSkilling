import React, { createContext, useState } from 'react';

// ==========================================================================
// TASK 2 - Step 81: Create EnrollmentContext and EnrollmentProvider
// ==========================================================================
export const EnrollmentContext = createContext();

export const EnrollmentProvider = ({ children }) => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const enroll = (courseId) => {
        if (!enrolledCourses.includes(courseId)) {
            setEnrolledCourses(prev => [...prev, courseId]);
        }
    };

    // TASK 2 - Step 84: Add a Remove function to the context
    const unenroll = (courseId) => {
        setEnrolledCourses(prev => prev.filter(id => id !== courseId));
    };

    return (
        <EnrollmentContext.Provider value={{ enrolledCourses, enroll, unenroll }}>
            {children}
        </EnrollmentContext.Provider>
    );
};
