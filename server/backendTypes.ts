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
