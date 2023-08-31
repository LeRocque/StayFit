import { combineReducers } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";
import workoutsSlice from "./workoutsSlice";

const reducers = combineReducers({
  users: usersSlice,
  workouts: workoutsSlice,
});

export default reducers;
