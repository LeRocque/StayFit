import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as jwtStrat from "jose";
import { CookieVals, ResLocalsAssignJwt } from "../backendTypes";

const jwtSecret = process.env.JWT_SECRET || "";
const secretEncoded = new TextEncoder().encode(jwtSecret);
const maxAge = 3 * 24 * 60 * 60;

const authController = {
  assignJwt: (_req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = res.locals as ResLocalsAssignJwt;
      const token = jwt.sign({ id }, jwtSecret, {
        expiresIn: maxAge,
      });
      res.locals.token = token;
      return next();
    } catch (err) {
      const error: string = err as string;
      return next({
        log: `Error occured in authController.assignJwt ${error}`,
        status: 500,
        message: { err: "Unable to assign token" },
      });
    }
  },

  cookieCreator: (_req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = res.locals;
      const { id } = res.locals;
      res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        })
        .cookie("ssid", id, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        });
      return next();
    } catch (err) {
      const error: string = err as string;
      return next({
        log: `Error occured in authController.cookieCreator ${error}`,
        status: 500,
        message: { err: "Unable to create cookie" },
      });
    }
  },

  isAuthenticated: async (req: Request, _res: Response, next: NextFunction) => {
    const { token } = req.cookies as CookieVals;
    const { ssid } = req.cookies as CookieVals;
    const { user_id } = req.params;
    if (token) {
      try {
        const { payload, protectedHeader } = await jwtStrat.jwtVerify(
          token,
          secretEncoded,
        );
        if (user_id) {
          if (payload.id !== Number(ssid) || user_id !== ssid) {
            console.log(protectedHeader);
            return next({
              log: "Error occured in authController.isAuthenticated",
              status: 401,
              message: { err: "Unable to verify token" },
            });
          }
          return next();
        }
        if (payload.id !== Number(ssid)) {
          console.log(protectedHeader);
          return next({
            log: "Error occured in authController.isAuthenticated",
            status: 401,
            message: { err: "Unable to verify token" },
          });
        }
        return next();
      } catch (err) {
        const error: string = err as string;
        return next({
          log: `Error occured in authController.isAuthenticated ${error}`,
          status: 500,
          message: { err: "Unable to verify token" },
        });
      }
    }
  },
};

export default authController;
