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

  const handleSubmit = async (e: FormEvent) => {
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
    }
  };

  const handleWorkoutName = (e: ChangeEvent<HTMLInputElement>) =>
    setWorkoutName(e.target.value);
  const handleMuscleTarget = (e: ChangeEvent<HTMLSelectElement>) =>
    setMuscleTarget(e.target.value);
  const handleWeight = (e: ChangeEvent<HTMLInputElement>) =>
    setWeight(e.target.value);
  const handleReps = (e: ChangeEvent<HTMLInputElement>) =>
    setReps(e.target.value);

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleEditModal(null);
    }
  };

  return (
    <div id="modal-container" onClick={handleModalClick}>
      <form id="addWorkoutForm" onSubmit={handleSubmit}>
        <input
          id={id}
          type="text"
          name="workoutname"
          required
          placeholder="Workout Name"
          value={workoutName}
          onChange={handleWorkoutName}
        />
        <select
          id={id + "2"}
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
          name="weight"
          required
          placeholder="Weight"
          value={weight}
          onChange={handleWeight}
        />
        <input
          id={id + "4"}
          name="reps"
          required
          placeholder="Reps"
          value={reps}
          onChange={handleReps}
        />
        <button
          className="text-2xl text-white outline hover:text-gray-200"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
