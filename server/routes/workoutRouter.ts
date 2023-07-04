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
    return res.status(200).json("Workout succesfully created");
  }
);

workoutRouter.put("/edit", (_req: Request, res: Response) => {
  return res.status(200);
});

workoutRouter.delete("/remove", (_req: Request, res: Response) => {
  return res.status(200);
});

export default workoutRouter;
