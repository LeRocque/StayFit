export type SignupModalProps = {
  handleModal: (value: void) => void;
};

export interface ReturnedUserId {
  user_id: number;
}

export type UserWorkoutsTypes = {
  workout_id: number;
  workoutname: string;
  user_id: number;
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


export type WorkoutImage = {
  image?: string;
};

export type WorkoutImages = {
  count: number;
  next: string | null;
  previous: null | null;
  images: {
    results: WorkoutImage[];
  };
};

export interface WorkoutsState {
  workouts: UserWorkoutsTypes[];
}


interface Image {
  id: number;
  uuid: string;
  exercise_base: number;
  exercise_base_uuid: string;
  image: string;
  is_main: boolean;
  style: string;
  license: number;
  license_title: string;
  license_object_url: string;
  license_author: string;
  license_author_url: string;
  license_derivative_source_url: string;
  author_history: string[];
}

export interface ImagesState {
  count: number;
  next: null | string;
  previous: null | string;
  results: Image[];
}