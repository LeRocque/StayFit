import express, { Request, Response } from "express";
import userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.post(
  "/login",
  userController.verifyUser,
  (_req: Request, res: Response) => {
    return res.status(200).json({ user_id: res.locals.id });
  }
);

userRouter.post(
  "/signup",
  userController.createUser,
  (_req: Request, res: Response) => {
    return res.status(200).json({ user_id: res.locals.id });
  }
);

export default userRouter;
