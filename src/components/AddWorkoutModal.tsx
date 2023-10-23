import React, { ChangeEvent, FormEvent, useState, useTransition } from "react";
import { WorkoutModalProps } from "../frontendTypes";

export const AddWorkoutModal = ({
  userId,
  handleWorkoutModal,
}: WorkoutModalProps) => {
  const [workoutName, setWorkoutName] = useState("Barbell Shrugs");
  const [muscleTarget, setMuscleTarget] = useState("Abs");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // function that will send userId, workoutName, muscleTarget, weight, and reps state values to the backend to create new workout related to user
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch("/workout/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          workoutName: workoutName,
          muscleTarget: muscleTarget,
          weight: weight,
          reps: reps,
        }),
      });
      // if workout was successfully created we will change workoutName, muscleTarget, weight, and reps state back to an empty string, and we will close the workoutModal
      if (response.ok) {
        setWorkoutName("");
        setMuscleTarget("");
        setWeight("");
        setReps("");
        startTransition(() => {
          handleWorkoutModal();
        });
      } else {
        alert("invalid input");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An error occuring while attempting to add new workout");
    }
  };

  // if user clicks enter on modal div, we will close the modal
  const handleModalKeyPress = (
    e: React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    if (e.key === "Enter") {
      handleWorkoutModal();
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

  // we will create and render a div that will contain our form. If an error occurs we will render a div to describe the error to the user (this will also include a button to remove the message for the user). Our form will have input fields for workoutNames, muscleTargets, weight, and reps (workoutNames and muscleTargets will be selects and weight/reps will be text inputs)
  return (
    <div
      className="position-fixed fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-opacity-90 bg-gradient-to-br from-slate-200 via-slate-500 to-slate-700 opacity-90"
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
        id="addWorkoutForm"
        onSubmit={handleSubmit}
        data-testid="addWorkoutForm"
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
        {isPending ? (
          <div className="mini loading-pane">
            <h2 className="loader">💪</h2>
          </div>
        ) : (
          <div>
            <button className="button-theme" type="submit">
              Submit
            </button>
            <button
              className="button-theme"
              type="button"
              onClick={() => handleWorkoutModal()}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
