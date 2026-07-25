import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {

  const enrolledCourses = useSelector(
    (state) => state.enrollment.enrolledCourses
  );

  return (
    <header
      style={{
        background: "#1976d2",
        color: "white",
        padding: "20px",
      }}
    >
      <h1>Student Portal</h1>

      <nav>
        <Link to="/">Home</Link>{" | "}
        <Link to="/courses">Courses</Link>{" | "}
        <Link to="/profile">Profile</Link>
      </nav>

      <h3>Enrolled Courses : {enrolledCourses.length}</h3>
    </header>
  );
}

export default Header;