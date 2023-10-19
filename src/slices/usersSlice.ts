import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// create and export usersSlice that will be used to store if a user is authenticated. Initial state will be a username as an empty string and an isAuthenticated as false. Reducers will be a userLogin and a userLogout. Slice will be named users
export const usersSlice = createSlice({
  name: "users",
  initialState: {
    username: "",
    isAuthenticated: false,
  },
  reducers: {
    // userLogin reducer will accept a username as the payload and update the username in state and isAuthenticated to true
    userLogin: (state, action: PayloadAction<string>) => {
      (state.username = action.payload), (state.isAuthenticated = true);
    },
    // userLogout will simply change the isAuthenticated state to false
    userLogout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

// export users action creators
export const { userLogin, userLogout } = usersSlice.actions;
// export users reducer
export default usersSlice.reducer;
