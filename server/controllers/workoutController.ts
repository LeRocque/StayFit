import db from "../models/dbModel";
import { Response, NextFunction } from "express";
import { DbQuery, ReqBodyWorkout, WorkoutRequest } from "../backendTypes";
import { WorkoutImages } from "../../src/frontendTypes";

const workoutController = {
  addWorkout: async (
    req: WorkoutRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const { user_id, muscleTarget, workoutName, weight, reps } =
      req.body as ReqBodyWorkout;
    // if all fields have been passed to addWorkout insert them into workouts table, otherwise sent a status 400 back to client
    if (user_id && muscleTarget && workoutName && weight && reps) {
      try {
        const queryString =
          "INSERT INTO workouts (user_id, muscleTarget, workoutName, weight, reps) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        const result = (await db.query(queryString, [
          user_id,
          muscleTarget,
          workoutName,
          weight,
          reps,
        ])) as DbQuery;
        res.locals.workout = result.rows[0];
        return next();
      } catch (err) {
        const error: string = err as string;
        return next({
          log: `Error in workoutController.addWorkout: ${error}`,
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
    next: NextFunction,
  ) => {
    const { user_id } = req.params;
    if (user_id) {
      try {
        // select all from workouts table where the user_id foreign key matches the user_id param
        const queryString =
          "SELECT * FROM workouts where user_id =$1 ORDER BY muscletarget";
        const result = (await db.query(queryString, [user_id])) as DbQuery;
        // if result.rows length is 0, return 'No workouts exist for this user', otherwise store result.rows on res.locals.workouts and call next
        if (result.rows.length === 0) {
          return res.status(204).json([]);
        } else {
          res.locals.workouts = result.rows;
          return next();
        }
      } catch (err) {
        const error: string = err as string;
        return next({
          log: `Error in workoutController.addWorkout: ${error}`,
          status: 500,
          message: "Internal server error",
        });
      }
    }
  },

  editWorkout: async (
    req: WorkoutRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const { workout_id, muscleTarget, workoutName, weight, reps } =
      req.body as ReqBodyWorkout;
    // if all fields have been passed in, UPDATE the workouts with the passed in values WHERE the workout_id matches the passed in id, then store the updated workout on res.locals.update and call next
    if (workout_id && muscleTarget && workoutName && weight && reps) {
      try {
        const queryString =
          "UPDATE workouts SET muscleTarget =$1, workoutName =$2, weight =$3, reps =$4 WHERE workout_id =$5 RETURNING *";
        const result = (await db.query(queryString, [
          muscleTarget,
          workoutName,
          weight,
          reps,
          workout_id,
        ])) as DbQuery;
        res.locals.update = result.rows[0];
        return next();
      } catch (err) {
        const error: string = err as string;
        return next({
          log: `Error in workoutController.editWorkout: ${error}`,
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
    next: NextFunction,
  ) => {
    const { workout_id } = req.params;
    if (workout_id) {
      try {
        const findQuery = "SELECT * FROM workouts WHERE workout_id =$1";
        const result = (await db.query(findQuery, [workout_id])) as DbQuery;
        if (result.rows.length === 0) {
          return res.status(400).json("Workout not found");
        } else {
          const deleteQuery =
            "DELETE FROM workouts WHERE workout_id =$1 RETURNING *";
          const result = (await db.query(deleteQuery, [workout_id])) as DbQuery;
          res.locals.deleted = result.rows[0];
          return next();
        }
      } catch (err) {
        const error: string = err as string;
        return next({
          log: `Error in workoutController.removeWorkout: ${error}`,
          status: 500,
          message: "Internal server error",
        });
      }
    }
  },

  getImages: async (
    _req: WorkoutRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const response = await fetch(
        "https://wger.de/api/v2/exerciseimage/?is_main=True&limit=200",
      );
      const images = (await response.json()) as WorkoutImages;
      res.locals.images = images;
      return next();
    } catch (err) {
      const error: string = err as string;
      return next({
        log: `Error in workoutController.getImages: ${error}`,
        status: 500,
        message: "Internal server error",
      });
    }
  },
};

export default workoutController;
