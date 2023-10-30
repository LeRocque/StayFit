import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  ImagesState,
  UserWorkoutsTypes,
  WorkoutsState,
} from "../frontendTypes";
import { AddWorkoutModal } from "../components/AddWorkoutModal";
import { EditWorkoutModal } from "../components/EditWorkoutModal";
import { GetWorkoutImages } from "../components/WorkoutImages";
import { userLogout } from "../slices/usersSlice";
import { setWorkouts } from "../slices/workoutsSlice";
import { RootState } from "../store";

// Component that will render the user's saved workouts with their corresponging images fetched from the API
const HomePage = () => {
  // grab userId from useParams hook
  const { userId } = useParams();
  const [userWorkouts, setUserWorkouts] = useState<UserWorkoutsTypes[]>([]);
  const [showAddWorkoutModal, setShowAddWorkoutModal] = useState(false);
  const [editingWorkoutId, setEditingWorkoutId] = useState<number | null>(null);
  const [workoutDeleted, setWorkoutDeleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  // get workoutImages from our Redux store
  const workoutImages: ImagesState = useAppSelector(
    (state: RootState) => state.workouts.images,
  );

  // useEffect hook that will trigger on initial render, any time dispatch is called, or any time editingWorkoutId, userId, showAddWorkoutModal, or workoutDeleted state changes
  useEffect(() => {
    const getUserWorkouts = async (): Promise<void> => {
      try {
        // if userId is defined we will send a fetch request to our '/workout/userId' endpoint.
        if (userId) {
          const result = await fetch(`/workout/${userId}`);
          // if response is 204 it means the user does not yet have workouts so we will return undefined and exit the getUserWorkouts function
          if (result.status === 204) {
            return;
          }
          // assign JSON response to workouts variable and dispatch to our setWorkouts action. This will set our workoutState in our redux store with returned user workouts
          const workouts = (await result.json()) as WorkoutsState;
          dispatch(setWorkouts(workouts));
        }
      } catch (err) {
        console.error(err);
        // if there is an error will we log it and update the errorMessage state with appropriate message
        setErrorMessage("An error occurred while fetching user workouts.");
      }
    };
    void getUserWorkouts();
  }, [dispatch, editingWorkoutId, userId, showAddWorkoutModal, workoutDeleted]);

  // repeat our useEffect hook exactly the same way as we did prior except this time we will assert the response type as UserWorkoutTypes array to make TypeScript happy
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
        dispatch(userLogout());
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
        <button
          className="button-theme"
          onClick={handleWorkoutModal}
          data-testid="add-workout-button"
        >
          Add Workout
        </button>
        <button className="button-theme" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="grid h-screen grid-cols-1 gap-1 overflow-y-auto sm:grid-cols-2 lg:grid-cols-4">
        {userWorkouts && userWorkouts.length > 0 ? (
          userWorkouts.map((el) => (
            <div key={el.workout_id} className=" m-14 ">
              <ul className="flex flex-col items-center justify-center rounded-xl bg-white text-blue-700 shadow-lg">
                <li className="workout-desc">{el.workoutname}</li>
                <li className="workout-desc">
                  Muscle Target - {el.muscletarget}
                </li>
                <li className="workout-desc">Weight - {el.weight}</li>
                <li className="workout-desc">Reps - {el.reps}</li>

                <img
                  className="min-w-1/3 min-h-1/3 h-1/3 w-1/3 bg-transparent"
                  src={handleWorkoutImage(el.workoutname)}
                  alt="Workout"
                />
              </ul>

              {editingWorkoutId === el.workout_id && (
                <EditWorkoutModal
                  workoutId={el.workout_id}
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
          <div
            data-testid="no-workouts"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-lg border-2 border-blue-500 bg-white p-6 text-blue-400"
          >
            Add a workout in the top left corner to begin
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;
