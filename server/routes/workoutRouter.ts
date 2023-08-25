import express, { Response } from "express";
import workoutController from "../controllers/workoutController";
import authController from "../controllers/authController";
import { WorkoutRequest } from "../backendTypes";

const workoutRouter = express.Router();

workoutRouter.get(
  "/:user_id",
  authController.isAuthenticated,
  workoutController.getWorkout,
  (_req: WorkoutRequest, res: Response) => {
    return res.status(200).json(res.locals.workouts);
  },
);

workoutRouter.post(
  "/add",
  authController.isAuthenticated,
  workoutController.addWorkout,
  (_req: WorkoutRequest, res: Response) => {
    return res.status(200).json(res.locals.workout);
  },
);

workoutRouter.put(
  "/edit",
  authController.isAuthenticated,
  workoutController.editWorkout,
  (_req: WorkoutRequest, res: Response) => {
    return res.status(200).json(res.locals.update);
  },
);

workoutRouter.delete(
  "/remove/:workout_id",
  authController.isAuthenticated,
  workoutController.removeWorkout,
  (_req: WorkoutRequest, res: Response) => {
    return res.status(200).json(res.locals.deleted);
  },
);

export default workoutRouter;
