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

export type UserActionTypes = LoginUserAction | LogoutUserAction;

export const loginUserActionCreator = (username: string): UserActionTypes => ({
  type: types.LOGIN_USER,
  payload: { username },
});

export const logoutUserActionCreator = (): UserActionTypes => ({
  type: types.LOGOUT_USER,
});