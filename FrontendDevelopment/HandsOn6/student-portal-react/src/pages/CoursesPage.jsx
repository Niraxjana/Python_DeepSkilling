import courses from "../data/courses";
import CourseCard from "../components/CourseCard";

function CoursesPage() {
  return (
    <div>
      <h2>Courses</h2>

      {courses.map((course) => (
        <CourseCard
          key={course.id}
          {...course}
        />
      ))}
    </div>
  );
}

export default CoursesPage;