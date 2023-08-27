import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ImagesState } from "../frontendTypes";

const initialImagesState: ImagesState = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

export const workoutsSlice = createSlice({
  name: "workouts",
  initialState: {
    workouts: [],
    images: initialImagesState,
  },
  reducers: {
    setWorkouts: (state, action: PayloadAction<[]>) => {
      state.workouts = action.payload;
    },
    setImages: (state, action: PayloadAction<ImagesState>) => {
      state.images = action.payload;
    },
  },
});

export const { setWorkouts, setImages } = workoutsSlice.actions;
export default workoutsSlice.reducer;
