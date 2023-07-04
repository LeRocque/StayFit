import express, { Request, Response } from "express";
import workoutController from "../controllers/workoutController";

const workoutRouter = express.Router();

workoutRouter.get(
  "/:user_id",
  workoutController.getWorkout,
  (_req: Request, res: Response) => {
    return res.status(200).json(res.locals.workouts);
  }
);

workoutRouter.post(
  "/add",
  workoutController.addWorkout,
  (_req: Request, res: Response) => {
    return res.status(200).json("Workout successfully created");
  }
);

workoutRouter.put(
  "/edit",
  workoutController.editWorkout,
  (_req: Request, res: Response) => {
    return res.status(200).json(res.locals.update);
  }
);

workoutRouter.delete(
  "/remove/:workout_id",
  workoutController.removeWorkout,
  (_req: Request, res: Response) => {
    return res.status(200).json("Workout successfully deleted");
  }
);

export default workoutRouter;
