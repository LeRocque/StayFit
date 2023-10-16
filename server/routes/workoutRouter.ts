import express, { Response } from "express";
import workoutController from "../controllers/workoutController";
import authController from "../controllers/authController";
import { WorkoutRequest } from "../backendTypes";
import { WorkoutImages } from "../../src/frontendTypes";

const workoutRouter = express.Router();

// Route that makes fetch request to API and returns workout images
workoutRouter.get(
  "/images",
  workoutController.getImages,
  (_req: WorkoutRequest, res: Response) => {
    const images = res.locals.images as WorkoutImages;
    return res.status(200).json({ images: images });
  },
);

// Protected route that gets all workouts associated with user
workoutRouter.get(
  "/:user_id",
  authController.isAuthenticated,
  workoutController.getWorkout,
  (_req: WorkoutRequest, res: Response) => {
    return res.status(200).json(res.locals.workouts);
  },
);

// Protected route that adds and returns workouts related to user
workoutRouter.post(
  "/add",
  authController.isAuthenticated,
  workoutController.addWorkout,
  (_req: WorkoutRequest, res: Response) => {
    return res.status(201).json(res.locals.workout);
  },
);

// Protected route that edits and returns a workout related to user
workoutRouter.put(
  "/edit",
  authController.isAuthenticated,
  workoutController.editWorkout,
  (_req: WorkoutRequest, res: Response) => {
    return res.status(202).json(res.locals.update);
  },
);

// Protected route that deletes and returns a workout related to a user
workoutRouter.delete(
  "/remove/:workout_id",
  authController.isAuthenticated,
  workoutController.removeWorkout,
  (_req: WorkoutRequest, res: Response) => {
    return res.status(202).json(res.locals.deleted);
  },
);

export default workoutRouter;
