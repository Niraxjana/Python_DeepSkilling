import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { enroll } from "../redux/enrollmentSlice";

function CourseCard(props) {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  function handleEnroll() {

    dispatch(enroll(props));

    navigate("/profile");
  }

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "20px",
        margin: "20px",
      }}
    >
      <h2
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => navigate(`/courses/${props.id}`)}
      >
        {props.name}
      </h2>

      <p>Code : {props.code}</p>

      <p>Credits : {props.credits}</p>

      <p>Grade : {props.grade}</p>

      <button onClick={handleEnroll}>
        Enroll
      </button>
    </div>
  );
}

export default CourseCard;