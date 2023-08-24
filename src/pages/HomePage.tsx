import { useEffect, useId, useState } from "react";
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
        if (result.status === 204) {
          return;
        }
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
      prevId === workout_id ? null : workout_id,
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

  const id = useId();

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {userWorkouts.length ? (
          userWorkouts.map((el) => (
            <div key={el.workout_id} className=" m-10 ">
              <ul>
                <label htmlFor={id}>{el.workoutname}</label>
                <li>
                  <label htmlFor={id + "2"}>
                    Muscle Target - {el.muscletarget}
                  </label>
                </li>
                <li>
                  <label htmlFor={id + "3"}>Weight - {el.weight}</label>
                </li>
                <li>
                  <label htmlFor={id + "4"}>Reps - {el.reps}</label>
                </li>
              </ul>
              {editingWorkoutId === el.workout_id && (
                <EditWorkoutModal
                  id={id}
                  workout_id={el.workout_id}
                  handleEditModal={() => handleEditModal(el.workout_id)}
                />
              )}
              <button
                className="button-theme"
                onClick={() => handleEditModal(el.workout_id)}
              >
                Edit Workout
              </button>
              <button
                className="button-theme"
                onClick={() => handleDelete(el.workout_id)}
              >
                Delete Workout
              </button>
            </div>
          ))
        ) : (
          <div>No workouts added yet.</div>
        )}
      </div>
      <div className="flex items-center justify-center">
        <button className="button-theme" onClick={handleWorkoutModal}>
          Add Workout
        </button>
        <button className="button-theme" onClick={handleLogout}>
          Logout
        </button>
        {showAddWorkoutModal && (
          <AddWorkoutModal
            userId={userId}
            handleWorkoutModal={handleWorkoutModal}
          />
        )}
      </div>
    </div>
  );
};
