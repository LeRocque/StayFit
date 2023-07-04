import db from "../models/dbModel";
import { Response, NextFunction } from "express";
import { WorkoutRequest } from "../backendTypes";

/*
Create workouts table with the following
CREATE TABLE workouts (
  workout_id   SERIAL PRIMARY KEY,
  user_id      INT REFERENCES users(user_id),
  muscleTarget VARCHAR(50),
  workoutName  VARCHAR(50),
  weight       VARCHAR(50),
  reps         VARCHAR(50)
);
*/

const workoutController = {
  addWorkout: async (
    req: WorkoutRequest,
    res: Response,
    next: NextFunction
  ) => {
    console.log("addWorkout called");
    const { user_id, muscleTarget, workoutName, weight, reps } = req.body;
    // if all fields have been passed to addWorkout insert them into workouts table, otherwise sent a status 400 back to client
    if (user_id && muscleTarget && workoutName && weight && reps) {
      try {
        const queryString =
          "INSERT INTO workouts (user_id, muscleTarget, workoutName, weight, reps) VALUES ($1, $2, $3, $4, $5)";
        await db.query(queryString, [
          user_id,
          muscleTarget,
          workoutName,
          weight,
          reps,
        ]);
        console.log("Workout created");
        return next();
      } catch (err) {
        return next({
          log: `Error in workoutController.addWorkout: ${err}`,
          status: 500,
          message: "Internal server error",
        });
      }
    }
    console.log("Missing workout fields, failed to create workout");
    return res.status(400).json("Please fill out all fields");
  },

  getWorkout: async (
    req: WorkoutRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { user_id } = req.params;
    try {
      // select all from workouts table where the user_id foreign key matches the user_id param
      console.log("getWorkout called");
      const queryString = `SELECT * FROM workouts where user_id = ${user_id}`;
      const result = await db.query(queryString);
      // if result.rows length is 0, return 'No workouts exist for this user', otherwise store result.rows on res.locals.workouts and call next
      if (result.rows.length === 0) {
        res.json("No workouts exist for this user");
      } else {
        console.log("query result", result.rows);
        res.locals.workouts = result.rows;
        return next();
      }
    } catch (err) {
      return next({
        log: `Error in workoutController.addWorkout: ${err}`,
        status: 500,
        message: "Internal server error",
      });
    }
  },
};

export default workoutController;
