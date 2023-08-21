import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./usersReducer";

const reducers = combineReducers({
  users: usersReducer,
});

export default reducers;
