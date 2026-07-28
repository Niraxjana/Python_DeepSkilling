import React, { useState } from 'react';

// ==========================================================================
// TASK 3 - Step 74: StudentProfile component with local form state
// ==========================================================================
const StudentProfile = () => {
    // Initial profile state
    const [profile, setProfile] = useState({
        name: 'Harine T',
        email: 'harine.t@student.edu',
        semester: '6'
    });

    // Handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <section id="profile" className="profile-section">
            <h2>Student Profile</h2>
            
            <div className="profile-container">
                <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="profile-name">Full Name:</label>
                        <input 
                            type="text" 
                            id="profile-name" 
                            name="name" 
                            value={profile.name} 
                            onChange={handleChange} 
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="profile-email">Email Address:</label>
                        <input 
                            type="email" 
                            id="profile-email" 
                            name="email" 
                            value={profile.email} 
                            onChange={handleChange} 
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="profile-semester">Current Semester:</label>
                        <input 
                            type="number" 
                            id="profile-semester" 
                            name="semester" 
                            value={profile.semester} 
                            onChange={handleChange} 
                            placeholder="Enter semester"
                        />
                    </div>
                </form>

                {/* Profile display card showing live updates */}
                <div className="profile-card-display">
                    <h3>Profile Card</h3>
                    <div className="avatar-placeholder">HT</div>
                    <p>Name: <strong>{profile.name}</strong></p>
                    <p>Email: <strong>{profile.email}</strong></p>
                    <p>Semester: <strong>{profile.semester}</strong></p>
                </div>
            </div>
        </section>
    );
};

export default StudentProfile;
