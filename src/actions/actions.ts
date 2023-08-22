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

interface Workout {
  user_id: number;
  workout_id: number;
  muscletarget: string;
  workoutname: string;
  weight: string;
  reps: string;
}

export interface WorkoutState {
  workouts: Workout[];
}

export type WorkoutActionTypes = SetWorkoutsAction

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

