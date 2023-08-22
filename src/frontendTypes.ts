export type SignupModalProps = {
  handleModal: (value: void) => void;
};

export type UserWorkoutsTypes = {
  workout_id: number;
  workoutname: string;
  user_id: string;
  muscletarget: string;
  weight: string;
  reps: string;
};

export type WorkoutModalProps = {
  userId: string | undefined;
  handleModal: (value: void) => void;
};
