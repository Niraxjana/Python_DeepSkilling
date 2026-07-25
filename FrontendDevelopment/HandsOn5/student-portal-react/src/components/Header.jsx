function Header({ siteName, enrolledCount }) {
  return (
    <header
      style={{
        background: "#1976d2",
        color: "white",
        padding: "20px",
      }}
    >
      <h1>{siteName}</h1>

      <nav>
        <a href="#">Home</a> | <a href="#">Courses</a> |{" "}
        <a href="#">Profile</a>
      </nav>

      <h3>Enrolled Courses: {enrolledCount}</h3>
    </header>
  );
}

export default Header;