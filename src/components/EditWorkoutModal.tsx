import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import {
  EditWorkoutModalProps,
  UserWorkoutsTypes,
  WorkoutState,
} from "../frontendTypes";
import { useAppSelector } from "../hooks";

export const EditWorkoutModal = ({
  id,
  workout_id,
  handleEditModal,
}: EditWorkoutModalProps) => {
  const [workoutName, setWorkoutName] = useState("");
  const [muscleTarget, setMuscleTarget] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const workoutToEdit = useAppSelector((state: WorkoutState) =>
    state.workouts.workouts.find(
      (workout: UserWorkoutsTypes) => workout.workout_id === workout_id,
    ),
  );

  useEffect(() => {
    if (workoutToEdit) {
      setWorkoutName(workoutToEdit.workoutname);
      setMuscleTarget(workoutToEdit.muscletarget);
      setWeight(workoutToEdit.weight);
      setReps(workoutToEdit.reps);
    }
  }, [workoutToEdit]);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch("/workout/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workout_id: workout_id,
          workoutName: workoutName,
          muscleTarget: muscleTarget,
          weight: weight,
          reps: reps,
        }),
      });
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

  const handleWorkoutName = (e: ChangeEvent<HTMLInputElement>): void =>
    setWorkoutName(e.target.value);
  const handleMuscleTarget = (e: ChangeEvent<HTMLSelectElement>): void =>
    setMuscleTarget(e.target.value);
  const handleWeight = (e: ChangeEvent<HTMLInputElement>): void =>
    setWeight(e.target.value);
  const handleReps = (e: ChangeEvent<HTMLInputElement>): void =>
    setReps(e.target.value);

  const handleModalClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      handleEditModal(null);
    }
  };
  const handleModalKeyPress = (
    e: React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    if (e.key === "Enter") {
      handleEditModal(null);
    }
  };

  return (
    <div
      id="modal-container"
      onClick={handleModalClick}
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
      >
        <input
          id={id}
          className="search-input"
          type="text"
          name="workoutname"
          required
          placeholder="Workout Name"
          value={workoutName}
          onChange={handleWorkoutName}
        />
        <select
          id={id + "2"}
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
          <option value="Back">Back</option>
          <option value="Shoulders">Shoulders</option>
          <option value="Legs">Legs</option>
          <option value="Chest">Chest</option>
          <option value="Abs">Abs</option>
          <option value="Biceps">Biceps</option>
          <option value="Triceps">Triceps</option>
        </select>
        <input
          id={id + "3"}
          className="search-input"
          type="text"
          name="weight"
          required
          placeholder="Weight"
          value={weight}
          onChange={handleWeight}
        />
        <input
          id={id + "4"}
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
