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
    routineName: string;
    muscleTarget: string;
    workoutName: string;
    weight: number;
    reps: number;
  };
};
