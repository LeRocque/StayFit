import { useEffect, useId, useState } from "react";
import { useParams } from "react-router-dom";
import {
  logoutUserActionCreator,
  setWorkoutsActionCreator,
} from "../actions/actions";
import { useAppDispatch, useAppSelector } from "../hooks";
import { UserWorkoutsTypes, WorkoutImageState } from "../frontendTypes";
import { AddWorkoutModal } from "../components/AddWorkoutModal";
import { EditWorkoutModal } from "../components/EditWorkoutModal";

const HomePage = () => {
  const { userId } = useParams();
  const [userWorkouts, setUserWorkouts] = useState<UserWorkoutsTypes[]>([]);
  const [showAddWorkoutModal, setShowAddWorkoutModal] = useState(false);
  const [editingWorkoutId, setEditingWorkoutId] = useState<number | null>(null);
  const [workoutDeleted, setWorkoutDeleted] = useState(false);

  const dispatch = useAppDispatch();

  const workoutImages = useAppSelector(
    (state: WorkoutImageState) => state.workouts.images,
  );
  console.log("workoutImages are:", workoutImages);
  useEffect(() => {
    const getUserWorkouts = async (): Promise<void> => {
      try {
        if (userId) {
          const result = await fetch(`/workout/${userId}`);
          if (result.status === 204) {
            return;
          }
          const workouts = (await result.json()) as UserWorkoutsTypes[];
          setUserWorkouts(workouts);
          dispatch(setWorkoutsActionCreator(workouts));
        }
      } catch (err) {
        console.error(err);
      }
    };
    getUserWorkouts();
  }, [dispatch, editingWorkoutId, userId, showAddWorkoutModal, workoutDeleted]);

  const handleLogout = async (): Promise<void> => {
    try {
      const result = await fetch("/user/logout", {
        credentials: "include",
      });
      if (result.ok) {
        dispatch(logoutUserActionCreator());
      } else {
        alert("unable to logout");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleWorkoutModal = (): void =>
    setShowAddWorkoutModal(!showAddWorkoutModal);

  const handleEditModal = (workout_id: number | null): void => {
    setEditingWorkoutId((prevId) =>
      prevId === workout_id ? null : workout_id,
    );
  };

  const handleDelete = async (e: number): Promise<void> => {
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
              {workoutImages.images.results.length > 0 ? (
                <img
                  src={workoutImages.images.results[0].image}
                  alt="Workout"
                />
              ) : (
                <p>No workout images available</p>
              )}
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
export default HomePage;
