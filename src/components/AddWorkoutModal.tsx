import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { WorkoutModalProps } from "../frontendTypes";

export const AddWorkoutModal = ({
  userId,
  handleWorkoutModal,
}: WorkoutModalProps) => {
  const [workoutName, setWorkoutName] = useState("");
  const [muscleTarget, setMuscleTarget] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  const handleSubmit = async (e: FormEvent) => {
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
      if (response.ok) {
        setWorkoutName("");
        setMuscleTarget("");
        setWeight("");
        setReps("");
        handleWorkoutModal();
      } else {
        alert("invalid input");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleWorkoutModal();
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

  return (
    <div id="modal-container" onClick={handleModalClick}>
      <form id="addWorkoutForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
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
        <button
          className="button-theme"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
