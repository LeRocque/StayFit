import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { EditWorkoutModalProps, UserWorkoutsTypes } from "../frontendTypes";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";

export const EditWorkoutModal = ({
  workoutId,
  handleEditModal,
}: EditWorkoutModalProps) => {
  const [workoutName, setWorkoutName] = useState("");
  const [muscleTarget, setMuscleTarget] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // access the store to get user workouts
  const workoutState = useAppSelector(
    (state: RootState) =>
      state.workouts.workouts as unknown as UserWorkoutsTypes[],
  );

  // if user has workouts, initialize workoutToEdit variable that matches workout id that was passed to our EditWorkoutModal props
  useEffect(() => {
    if (workoutState) {
      const workoutToEdit = workoutState.find(
        (el: UserWorkoutsTypes) => el.workout_id === workoutId,
      );
      // if there is a workout to edit, update name, muscleTarget, weight, and reps state to match workout to edit
      if (workoutToEdit) {
        setWorkoutName(workoutToEdit.workoutname);
        setMuscleTarget(workoutToEdit.muscletarget);
        setWeight(workoutToEdit.weight);
        setReps(workoutToEdit.reps);
      }
    }
    // update workout name, muscleTarget, weight, and reps any time workoutId prop changes or workoutState is updated
  }, [workoutId, workoutState]);

  // function that will make fetch request to our edit endpoint. We will send the passed down workoutId prop along with the current workoutName, muscleTarget, weight, and reps state
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch("/workout/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workout_id: workoutId,
          workoutName: workoutName,
          muscleTarget: muscleTarget,
          weight: weight,
          reps: reps,
        }),
      });
      // if workout was successfully editted we will update corresponding state values to empty strings and we will update handleEditModal to be null
      if (response.ok) {
        setWorkoutName("");
        setMuscleTarget("");
        setWeight("");
        setReps("");
        handleEditModal(null);
      } else {
        alert("invalid input");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("And error occurred while attempting to edit workout");
    }
  };

  // functions to update state with current values inputted by user in our form
  const handleWorkoutName = (e: ChangeEvent<HTMLSelectElement>): void =>
    setWorkoutName(e.target.value);
  const handleMuscleTarget = (e: ChangeEvent<HTMLSelectElement>): void =>
    setMuscleTarget(e.target.value);
  const handleWeight = (e: ChangeEvent<HTMLInputElement>): void =>
    setWeight(e.target.value);
  const handleReps = (e: ChangeEvent<HTMLInputElement>): void =>
    setReps(e.target.value);

  // if user clicks enter on modal div, we will close the modal
  const handleModalKeyPress = (
    e: React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    if (e.key === "Enter") {
      handleEditModal(null);
    }
  };

  // we will create and render a div that will contain our form. If an error occurs we will render a div to describe the error to the user (this will also include a button to remove the message for the user). Our form will have input fields for workoutNames, muscleTargets, weight, and reps (workoutNames and muscleTargets will be selects and weight/reps will be text inputs)
  return (
    <div
      id="modal-container"
      onKeyDown={handleModalKeyPress}
      role="button"
      tabIndex={0}
    >
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
      <form
        className="mt-4 flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
        data-testid="editModalForm"
      >
        <select
          className="search-input"
          name="workoutname"
          required
          placeholder="Workout Name"
          value={workoutName}
          onChange={handleWorkoutName}
        >
          {" "}
          <option value="'" disabled>
            Workout Name
          </option>
          <option value="Barbell Shrugs">Barbell Shrugs</option>
          <option value="Bench Dips">Bench Dips</option>
          <option value="Bench Press">Bench Press</option>
          <option value="Bicep Curl Barbell">Bicep Curl Barbell</option>
          <option value="Bicep Curl Dumbbells">Bicep Curl Dumbbells</option>
          <option value="Bicep Curl Pulley">Bicep Curl Pulley</option>
          <option value="Cable Flys">Cable Flys</option>
          <option value="Calf Raises">Calf Raises</option>
          <option value="Close Grip Bench">Close Grip Bench</option>
          <option value="Deadlifts">Deadlifts</option>
          <option value="Decline Bench Press">Decline Bench Press</option>
          <option value="Dips">Dips</option>
          <option value="Dumbbell Bench Alt">Dumbbell Bench Alt</option>
          <option value="Dumbbell Bench Press">Dumbbell Bench Press</option>
          <option value="Dumbbell Flys">Dumbbell Flys</option>
          <option value="Dumbbell Row">Dumbbell Row</option>
          <option value="Dumbbell Shrugs">Dumbbell Shrugs</option>
          <option value="Dumbbell Shoulder Press">
            Dumbbell Shoulder Press
          </option>
          <option value="Front Delt Raises">Front Delt Raises</option>
          <option value="Hammer Curls">Hammer Curls</option>
          <option value="Leg Lifts">Leg Lifts</option>
          <option value="Leg Press">Leg Press</option>
          <option value="Lunges">Lunges</option>
          <option value="Pull Ups">Pull Ups</option>
          <option value="Push Ups">Push Ups</option>
          <option value="Push Ups Alt">Push Ups Alt</option>
          <option value="Skull Crushers">Skull Crushers</option>
          <option value="Squat Alt">Squat Alt</option>
          <option value="Squats">Squats</option>
          <option value="Sit Ups">Sit Ups</option>
          <option value="Tricep Pulldowns">Tricep Pulldowns</option>
        </select>
        <select
          className="search-input"
          name="muscletarget"
          required
          placeholder="Muscle Target"
          value={muscleTarget}
          onChange={handleMuscleTarget}
        >
          <option value="'" disabled>
            Muscle Target
          </option>
          <option value="Abs">Abs</option>
          <option value="Back">Back</option>
          <option value="Biceps">Biceps</option>
          <option value="Chest">Chest</option>
          <option value="Legs">Legs</option>
          <option value="Shoulders">Shoulders</option>
          <option value="Triceps">Triceps</option>
        </select>
        <input
          className="search-input"
          type="text"
          name="weight"
          required
          placeholder="Weight"
          value={weight}
          onChange={handleWeight}
        />
        <input
          className="search-input"
          type="text"
          name="reps"
          required
          placeholder="Reps"
          value={reps}
          onChange={handleReps}
        />
        <button className="button-theme" type="submit">
          Submit
        </button>
        <button
          className="button-theme"
          type="button"
          onClick={() => handleEditModal(null)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
