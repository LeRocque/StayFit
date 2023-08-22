import {
  EditWorkoutModalProps,
  UserWorkoutsTypes,
  WorkoutState,
} from "../frontendTypes";
import { useAppSelector } from "../hooks";

export const EditWorkoutModal = ({
  workout_id,
  handleEditModal,
}: EditWorkoutModalProps) => {
  const workoutToEdit = useAppSelector((state: WorkoutState) =>
    state.workouts.workouts.find(
      (workout: UserWorkoutsTypes) => workout.workout_id === workout_id
    )
  );
  
  return <div id="editWorkoutModal">Test Edit Modal</div>;
};
