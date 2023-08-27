import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    username: "",
    isAuthenticated: false,
  },
  reducers: {
    userLogin: (state, action: PayloadAction<string>) => {
      (state.username = action.payload), (state.isAuthenticated = true);
    },
    userLogout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { userLogin, userLogout } = usersSlice.actions;
export default usersSlice.reducer;
