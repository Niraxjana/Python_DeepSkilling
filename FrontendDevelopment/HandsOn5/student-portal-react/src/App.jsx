import { useEffect, useState } from "react";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CourseCard from "./components/CourseCard";
import StudentProfile from "./components/StudentProfile";

function App() {

  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {

    fetch("https://jsonplaceholder.typicode.com/posts")

      .then((response) => response.json())

      .then((data) => {

        const courseData = data.slice(0, 5).map(post => ({
          id: post.id,
          name: post.title,
          code: "CS" + post.id,
          credits: 3,
          grade: "A",
        }));

        setCourses(courseData);

        setLoading(false);

      })

      .catch(() => {

        setError("Unable to load courses.");

        setLoading(false);

      });

  }, []);

  /*
    Dependency array [courses] ensures this effect runs
    only when the courses state changes.
    Without it, the effect executes after every render.
  */

  useEffect(() => {

    console.log("Courses updated");

  }, [courses]);

  function handleEnroll(id) {

    if (!enrolledCourses.includes(id)) {
      setEnrolledCourses([...enrolledCourses, id]);
    }
  }

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <div className="app">

      <Header
        siteName="Student Portal"
        enrolledCount={enrolledCourses.length}
      />

      <input
        type="text"
        placeholder="Search Course"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <h2>Loading...</h2>}

      {error && <h2>{error}</h2>}

      {!loading &&
        filteredCourses.map(course => (
          <CourseCard
            key={course.id}
            {...course}
            onEnroll={handleEnroll}
          />
        ))}

      <StudentProfile />

      <Footer />

    </div>

  );
}

export default App;