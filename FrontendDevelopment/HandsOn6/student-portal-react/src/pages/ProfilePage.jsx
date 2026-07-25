import { useSelector, useDispatch } from "react-redux";
import { unenroll } from "../redux/enrollmentSlice";

function ProfilePage() {

  const dispatch = useDispatch();

  const enrolledCourses = useSelector(
    (state) => state.enrollment.enrolledCourses
  );

  return (
    <div style={{ padding: "20px" }}>

      <h2>Profile Page</h2>

      {enrolledCourses.length === 0 ? (
        <p>No Courses Enrolled</p>
      ) : (
        enrolledCourses.map((course) => (
          <div
            key={course.id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{course.name}</h3>

            <button
              onClick={() =>
                dispatch(unenroll(course.id))
              }
            >
              Remove
            </button>
          </div>
        ))
      )}

    </div>
  );
}

export default ProfilePage;