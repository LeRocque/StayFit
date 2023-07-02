import express, { Request, Response } from "express";

const workoutRouter = express.Router();

workoutRouter.get("/", (_req: Request, res: Response) => {
  return res.status(200);
  // .json(res.locals.workouts);
});

workoutRouter.post("/add", (_req: Request, res: Response) => {
  return res.status(200);
});

workoutRouter.put("/edit", (_req: Request, res: Response) => {
  return res.status(200);
});

workoutRouter.delete("/remove", (_req: Request, res: Response) => {
  return res.status(200);
});

export default workoutRouter;
