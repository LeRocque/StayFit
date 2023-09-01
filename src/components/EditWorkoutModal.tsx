import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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

  const workoutState = useAppSelector(
    (state: RootState) =>
      state.workouts.workouts as unknown as UserWorkoutsTypes[],
  );

  useEffect(() => {
    if (workoutState) {
      const workoutToEdit = workoutState.find(
        (el: UserWorkoutsTypes) => el.workout_id === workoutId,
      );
      if (workoutToEdit) {
        setWorkoutName(workoutToEdit.workoutname);
        setMuscleTarget(workoutToEdit.muscletarget);
        setWeight(workoutToEdit.weight);
        setReps(workoutToEdit.reps);
      }
    }
  }, [workoutId, workoutState]);

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
        <input
          className="search-input"
          type="text"
          name="workoutname"
          required
          placeholder="Workout Name"
          value={workoutName}
          onChange={handleWorkoutName}
        />
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
          <option value="Back">Back</option>
          <option value="Shoulders">Shoulders</option>
          <option value="Legs">Legs</option>
          <option value="Chest">Chest</option>
          <option value="Abs">Abs</option>
          <option value="Biceps">Biceps</option>
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
