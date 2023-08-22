import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { logoutUserActionCreator } from "../actions/actions";
import { useAppDispatch } from "../hooks";
import { UserWorkoutsTypes } from "../frontendTypes";
import { AddWorkoutModal } from "../components/AddWorkoutModal";

const HomePage = () => {
  const { userId } = useParams();
  const [userWorkouts, setUserWorkouts] = useState<UserWorkoutsTypes[]>([]);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const getUserWorkouts = async () => {
      try {
        const result = await fetch(`/workout/${userId}`);
        const workouts = await result.json();
        setUserWorkouts(workouts);
      } catch (err) {
        console.error(err);
      }
    };
    getUserWorkouts();
  }, [userId, showModal]);
  console.log("userWorkouts are:", userWorkouts);

  const handleLogout = () => {
    dispatch(logoutUserActionCreator());
  };

  const handleModal = () => setShowModal(!showModal);

  return (
    <div>
      {userWorkouts.map((el) => (
        <div key={el.workout_id} className="workoutCell">
          <ul>
            {el.workoutname}
            <li>Muscle Target - {el.muscletarget}</li>
            <li>Weight - {el.weight}</li>
            <li>Reps - {el.reps}</li>
          </ul>
          <button className="frontendButton">Edit Workout</button>
        </div>
      ))}
      <button className="frontendButton" onClick={handleModal}>
        Add Workout
      </button>
      <button className="signupButton" onClick={handleLogout}>
        Logout
      </button>
      {showModal && (
        <AddWorkoutModal userId={userId} handleModal={handleModal} />
      )}
    </div>
  );
};

export default HomePage;
