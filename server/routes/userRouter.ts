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
    const returnedId = res.locals.id as number;
    return res.status(200).json({ user_id: returnedId });
  },
);

userRouter.post(
  "/signup",
  userController.createUser,
  (_req: UserRequest, res: Response) => {
    const returnedId = res.locals.id as number;
    return res.status(201).json({ user_id: returnedId });
  },
);

userRouter.get(
  "/logout",
  userController.logout,
  (_req: UserRequest, res: Response) => {
    return res.status(202).json("Successful logout");
  },
);

userRouter.delete(
  "/remove/:user_id",
  userController.deleteUser,
  (_req: UserRequest, res: Response) => {
    return res.status(202).json(res.locals.deleted);
  },
);

export default userRouter;
