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
    default:
      return state;
  }
};

export default workoutsReducer;
