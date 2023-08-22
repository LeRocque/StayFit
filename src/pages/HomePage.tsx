import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  logoutUserActionCreator,
  setWorkoutsActionCreator,
} from "../actions/actions";
import { useAppDispatch } from "../hooks";
import { UserWorkoutsTypes } from "../frontendTypes";
import { AddWorkoutModal } from "../components/AddWorkoutModal";
import { EditWorkoutModal } from "../components/EditWorkoutModal";

export const HomePage = () => {
  const { userId } = useParams();
  const [userWorkouts, setUserWorkouts] = useState<UserWorkoutsTypes[]>([]);
  const [showAddWorkoutModal, setShowAddWorkoutModal] = useState(false);
  const [editingWorkoutId, setEditingWorkoutId] = useState<number | null>(null);
  const [workoutDeleted, setWorkoutDeleted] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const getUserWorkouts = async () => {
      try {
        const result = await fetch(`/workout/${userId}`);
        const workouts = await result.json();
        setUserWorkouts(workouts);
        dispatch(setWorkoutsActionCreator(workouts));
      } catch (err) {
        console.error(err);
      }
    };
    getUserWorkouts();
  }, [dispatch, editingWorkoutId, userId, showAddWorkoutModal, workoutDeleted]);

  const handleLogout = () => {
    dispatch(logoutUserActionCreator());
  };

  const handleWorkoutModal = () => setShowAddWorkoutModal(!showAddWorkoutModal);

  const handleEditModal = (workout_id: number | null) => {
    setEditingWorkoutId((prevId) =>
      prevId === workout_id ? null : workout_id
    );
  };

  const handleDelete = async (e: number) => {
    try {
      const result = await fetch(`/workout/remove/${e}`, {
        method: "DELETE",
      });
      if (result.ok) {
        alert("Workout Deleted!");
        setWorkoutDeleted(!workoutDeleted);
      }
    } catch (err) {
      console.error(err);
    }
  };

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
          {editingWorkoutId === el.workout_id && (
            <EditWorkoutModal
              workout_id={el.workout_id}
              handleEditModal={() => handleEditModal(el.workout_id)}
            />
          )}
          <button
            className="frontendButton"
            onClick={() => handleEditModal(el.workout_id)}
          >
            Edit Workout
          </button>
          <button
            className="frontendButton"
            onClick={() => handleDelete(el.workout_id)}
          >
            Delete Workout
          </button>
        </div>
      ))}
      <button className="frontendButton" onClick={handleWorkoutModal}>
        Add Workout
      </button>
      <button className="signupButton" onClick={handleLogout}>
        Logout
      </button>
      {showAddWorkoutModal && (
        <AddWorkoutModal
          userId={userId}
          handleWorkoutModal={handleWorkoutModal}
        />
      )}
    </div>
  );
};
