import { useEffect, useId, useState } from "react";
import { useParams } from "react-router-dom";
import {
  logoutUserActionCreator,
  setWorkoutsActionCreator,
} from "../actions/actions";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  UserWorkoutsTypes,
  WorkoutImageState,
  WorkoutImages,
} from "../frontendTypes";
import { AddWorkoutModal } from "../components/AddWorkoutModal";
import { EditWorkoutModal } from "../components/EditWorkoutModal";
import GetWorkoutImages from "../components/WorkoutImages";

const HomePage = () => {
  const { userId } = useParams();
  const [userWorkouts, setUserWorkouts] = useState<UserWorkoutsTypes[]>([]);
  const [showAddWorkoutModal, setShowAddWorkoutModal] = useState(false);
  const [editingWorkoutId, setEditingWorkoutId] = useState<number | null>(null);
  const [workoutDeleted, setWorkoutDeleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const workoutImages: WorkoutImages = useAppSelector(
    (state: WorkoutImageState) => state.workouts.images,
  );
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
        setErrorMessage("An error occurred while fetching user workouts.");
      }
    };
    void getUserWorkouts();
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
      setErrorMessage("An error occurred while logging out.");
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

  const handleWorkoutImage = (workoutname: string) => {
    return GetWorkoutImages(workoutname, workoutImages);
  };

  const id = useId();

  return (
    <div className=" flex h-screen flex-col justify-start">
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
          <button
            className="close-button"
            onClick={() => setErrorMessage(null)}
          >
            Dismiss Error
          </button>
        </div>
      )}
      <div className="flex items-center  justify-around bg-slate-500">
        {showAddWorkoutModal && (
          <AddWorkoutModal
            userId={userId}
            handleWorkoutModal={handleWorkoutModal}
          />
        )}
        <button className="button-theme" onClick={handleWorkoutModal}>
          Add Workout
        </button>
        <button className="button-theme" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="grid h-screen grid-cols-1 gap-1 overflow-y-auto sm:grid-cols-2 lg:grid-cols-4">
        {userWorkouts.length ? (
          userWorkouts.map((el) => (
            <div key={el.workout_id} className=" m-14 ">
              <ul className="flex flex-col items-center justify-center rounded-xl bg-white text-blue-700 shadow-lg">
                <li className="workout-desc">
                  <label htmlFor={id}>{el.workoutname}</label>
                </li>
                <li className="workout-desc">
                  <label htmlFor={id + "2"}>
                    Muscle Target - {el.muscletarget}
                  </label>
                </li>
                <li className="workout-desc">
                  <label htmlFor={id + "3"}>Weight - {el.weight}</label>
                </li>
                <li className="workout-desc">
                  <label htmlFor={id + "4"}>Reps - {el.reps}</label>
                </li>
                {workoutImages.images.results.length > 0 ? (
                  <img
                    className="min-w-1/3 min-h-1/3 h-1/3 w-1/3 bg-transparent"
                    src={handleWorkoutImage(el.workoutname)}
                    alt="Workout"
                  />
                ) : (
                  <p>No workout images available</p>
                )}
              </ul>

              {editingWorkoutId === el.workout_id && (
                <EditWorkoutModal
                  id={id}
                  workout_id={el.workout_id}
                  handleEditModal={() => handleEditModal(el.workout_id)}
                />
              )}
              <div className=" mt-2 flex justify-center">
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
            </div>
          ))
        ) : (
          <div>No workouts added yet.</div>
        )}
      </div>
    </div>
  );
};
export default HomePage;
