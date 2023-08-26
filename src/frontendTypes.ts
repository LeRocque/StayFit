export type SignupModalProps = {
  handleModal: (value: void) => void;
};

export interface ReturnedUserId {
  user_id: number
}

export type UserWorkoutsTypes = {
  workout_id: number;
  workoutname: string;
  user_id: string;
  muscletarget: string;
  weight: string;
  reps: string;
};

export interface resultImages {
  author_history: Array<number>;
  exercise_base: number;
  exercise_base_uuid: string;
  id: number;
  image: string;
  is_main: boolean;
  license: number;
  license_author: string;
  license_derivative_source_url: string;
  license_object_url: string;
  license_title: string;
  style: string;
  uuid: string;
}

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

export type WorkoutImages = {
  images: {
    count: number;
    next: string;
    previous: null;
    results: resultImages[];
  };
};

export type WorkoutImageState = {
  workouts: {
    images: {
      count: number;
      next: string;
      previous: null;
      images: {
        results: resultImages[];}
    };
  };
};
