import * as types from "../constants/actionTypes";
import { WorkoutActionTypes, WorkoutState } from "../actions/actions";

const initialState: WorkoutState = {
  workouts: [],
};
const workoutsReducer = (state = initialState, action: WorkoutActionTypes) => {
  switch (action.type) {
    case types.SET_WORKOUTS:
      return {
        ...state,
        workouts: action.payload.workouts,
      };
    case types.GET_WORKOUT: {
      const foundWorkout = state.workouts.find(
        (workout) => workout.workout_id === action.payload.workout_id
      );
      return foundWorkout ? foundWorkout : state;
    }
    default:
      return state;
  }
};

export default workoutsReducer;
