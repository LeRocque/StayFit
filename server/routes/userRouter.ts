import express, { Request, Response } from "express";

const userRouter = express.Router();

userRouter.post("/login", (_req: Request, res: Response) => {
  return res.status(200);
});

userRouter.post("/signup", (_req: Request, res: Response) => {
  return res.status(200);
});

export default userRouter;
