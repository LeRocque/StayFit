import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ImagesState, WorkoutsState } from "../frontendTypes";

// define initalImagesState to match response from Wagner API
const initialImagesState: ImagesState = {
  images: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
};

const initalWorkoutsState: WorkoutsState = {
  workouts: {
    workouts: [],
  },
};

// create and export workoutsSlice that will store all workout images and workouts related to used. Initial state for images will match API response and initial state for workouts will be an empty array. Reducers will be setWorkouts and setImages. Slice will be named workouts
export const workoutsSlice = createSlice({
  name: "workouts",
  initialState: {
    workouts: initalWorkoutsState,
    images: initialImagesState,
  },
  reducers: {
    // setWorkouts reducer will accept a payload of all workouts related to user and set the workouts state with that payload
    setWorkouts: (state, action: PayloadAction<WorkoutsState>) => {
      state.workouts = action.payload;
    },
    // setImages reducer will accept a payload that matches the response from the API and will update the images state with that payload
    setImages: (state, action: PayloadAction<ImagesState>) => {
      state.images = action.payload;
    },
  },
});

// export workouts actions creators
export const { setWorkouts, setImages } = workoutsSlice.actions;
// export workouts reducer
export default workoutsSlice.reducer;
