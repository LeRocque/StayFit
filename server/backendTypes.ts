import { Request } from "express";

export type UserRequest = Request & {
  body: {
    email?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    username: string;
    password: string;
  };
};

export type WorkoutRequest = Request & {
  body: {
    workout_id?: number;
    muscleTarget: string;
    workoutName: string;
    weight: number;
    reps: number;
  };
  params: {
    user_id?: string;
    workout_id?: string;
  };
};

export interface ResLocalsAssignJwt {
  id: number;
}

export interface ReqBodyUser {
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  username: string;
  password: string;
}

export interface CookieVals {
  token?: string;
  ssid?: string;
}

export interface UserRow {
  user_id: number;
  password?: string;
}

export interface ExistingUserQuery {
  rows: UserRow[];
}
