import { useState } from "react";

function StudentProfile() {

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    semester: "",
  });

  function handleChange(e) {

    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>

      <h2>Student Profile</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={profile.name}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={profile.email}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="semester"
        placeholder="Semester"
        value={profile.semester}
        onChange={handleChange}
      />

      <h4>Name: {profile.name}</h4>

      <h4>Email: {profile.email}</h4>

      <h4>Semester: {profile.semester}</h4>

    </div>
  );
}

export default StudentProfile;