import {
  ChangeEvent,
  FormEvent,
  useState,
  useTransition,
} from "react";
import { WorkoutModalProps } from "../frontendTypes";

export const AddWorkoutModal = ({
  userId,
  handleWorkoutModal,
}: WorkoutModalProps) => {
  const [workoutName, setWorkoutName] = useState("");
  const [muscleTarget, setMuscleTarget] = useState("Back");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const handleModalKeyPress = (
    e: React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    if (e.key === "Enter") {
      handleWorkoutModal();
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
