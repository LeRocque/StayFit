import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ImagesState, WorkoutsState } from "../frontendTypes";

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

export const workoutsSlice = createSlice({
  name: "workouts",
  initialState: {
    workouts: initalWorkoutsState,
    images: initialImagesState,
  },
  reducers: {
    setWorkouts: (state, action: PayloadAction<WorkoutsState>) => {
      state.workouts = action.payload;
    },
    setImages: (state, action: PayloadAction<ImagesState>) => {
      state.images = action.payload;
    },
  },
});

export const { setWorkouts, setImages } = workoutsSlice.actions;
export default workoutsSlice.reducer;
