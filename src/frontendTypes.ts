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
  handleWorkoutModal: (value: void) => void;
};

export type EditWorkoutModalProps = {
  workout_id: number;
  id: string;
  handleEditModal: (value: null) => void | null;
};

export type WorkoutState = {
  workouts: {
    workouts: {
      find: (
        callback: (workout: UserWorkoutsTypes) => boolean,
      ) => UserWorkoutsTypes | undefined;
    };
  };
};

export type WorkoutImageState = {
  workouts: {
    images: Array<number>;
  };
};
