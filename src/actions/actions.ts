import * as types from "../constants/actionTypes";

export interface LoginUserAction {
  type: typeof types.LOGIN_USER;
  payload: {
    username: string;
  };
}

export interface LogoutUserAction {
  type: typeof types.LOGOUT_USER;
}

export interface SetWorkoutsAction {
  type: typeof types.SET_WORKOUTS;
  payload: {
    workouts: {
      user_id: number;
      workout_id: number;
      muscletarget: string;
      workoutname: string;
      weight: string;
      reps: string;
    };
  };
}

export interface SetImagesAction {
  type: typeof types.SET_IMAGES;
  payload: {
    images: {
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
    };
  };
}

interface Workout {
  user_id: number;
  workout_id: number;
  muscletarget: string;
  workoutname: string;
  weight: string;
  reps: string;
}

interface resultImages {
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

export interface WorkoutState {
  workouts: Workout[];
  images: resultImages[];
}

export type WorkoutActionTypes = SetWorkoutsAction | SetImagesAction;

export type UserActionTypes = LoginUserAction | LogoutUserAction;

export const loginUserActionCreator = (username: string): UserActionTypes => ({
  type: types.LOGIN_USER,
  payload: { username },
});

export const logoutUserActionCreator = (): UserActionTypes => ({
  type: types.LOGOUT_USER,
});

export const setWorkoutsActionCreator = (workouts: {
  user_id: number;
  workout_id: number;
  muscletarget: string;
  workoutname: string;
  weight: string;
  reps: string;
}): WorkoutActionTypes => ({
  type: types.SET_WORKOUTS,
  payload: { workouts },
});

export const setImagesActionCreator = (images: {
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
}): SetImagesAction => ({
  type: types.SET_IMAGES,
  payload: { images },
});
