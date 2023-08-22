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
    const { user_id, muscleTarget, workoutName, weight, reps } = req.body;
    // if all fields have been passed to addWorkout insert them into workouts table, otherwise sent a status 400 back to client
    if (user_id && muscleTarget && workoutName && weight && reps) {
      try {
        const queryString =
          "INSERT INTO workouts (user_id, muscleTarget, workoutName, weight, reps) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        const result = await db.query(queryString, [
          user_id,
          muscleTarget,
          workoutName,
          weight,
          reps,
        ]);
        res.locals.workout = result.rows[0];
        return next();
      } catch (err) {
        return next({
          log: `Error in workoutController.addWorkout: ${err}`,
          status: 500,
          message: "Internal server error",
        });
      }
    }
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
      const queryString = `SELECT * FROM workouts where user_id = ${user_id} ORDER BY muscletarget`;
      const result = await db.query(queryString);
      // if result.rows length is 0, return 'No workouts exist for this user', otherwise store result.rows on res.locals.workouts and call next
      if (result.rows.length === 0) {
        return res.status(204).json([]);
      } else {
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

  editWorkout: async (
    req: WorkoutRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { workout_id, muscleTarget, workoutName, weight, reps } = req.body;
    // if all fields have been passed in, UPDATE the workouts with the passed in values WHERE the workout_id matches the passed in id, then store the updated workout on res.locals.update and call next
    if (workout_id && muscleTarget && workoutName && weight && reps) {
      try {
        const queryString = `UPDATE workouts SET muscleTarget = '${muscleTarget}', workoutName = '${workoutName}', weight = '${weight}', reps = '${reps}' WHERE workout_id = ${workout_id} RETURNING *`;
        const result = await db.query(queryString);
        res.locals.update = result.rows[0];
        return next();
      } catch (err) {
        return next({
          log: `Error in workoutController.editWorkout: ${err}`,
          status: 500,
          message: "Internal server error",
        });
      }
    }
    return res.status(400).json("Please enter all fields");
  },

  removeWorkout: async (
    req: WorkoutRequest,
    res: Response,
    next: NextFunction
  ) => {
    const { workout_id } = req.params;
    try {
      const findQuery = `SELECT * FROM workouts WHERE workout_id = ${workout_id}`;
      const result = await db.query(findQuery);
      if (result.rows.length === 0) {
        return res.status(400).json("Workout not found");
      } else {
        const deleteQuery = `DELETE FROM workouts WHERE workout_id = ${workout_id} RETURNING *`;
        const result = await db.query(deleteQuery);
        res.locals.deleted = result.rows[0];
        return next();
      }
    } catch (err) {
      return next({
        log: `Error in workoutController.removeWorkout: ${err}`,
        status: 500,
        message: "Internal server error",
      });
    }
  },
};

export default workoutController;
