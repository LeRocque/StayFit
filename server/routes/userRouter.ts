import express, { Response } from "express";
import userController from "../controllers/userController";
import authController from "../controllers/authController";
import { UserRequest } from "../backendTypes";

const userRouter = express.Router();

userRouter.post(
  "/login",
  userController.verifyUser,
  authController.assignJwt,
  authController.cookieCreator,
  (_req: UserRequest, res: Response) => {
    return res.status(200).json({ user_id: res.locals.id });
  },
);

userRouter.post(
  "/signup",
  userController.createUser,
  (_req: UserRequest, res: Response) => {
    return res.status(200).json({ user_id: res.locals.id });
  },
);

userRouter.get(
  "/logout",
  userController.logout,
  (_req: UserRequest, res: Response) => {
    return res.status(201).json("Successful logout");
  },
);

export default userRouter;
