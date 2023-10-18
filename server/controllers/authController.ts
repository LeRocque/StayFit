import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as jwtStrat from "jose";
import { CookieVals, ResLocalsAssignJwt } from "../backendTypes";

// initialize to env variable or empty string if not provided
const jwtSecret = process.env.JWT_SECRET || "";
// encode secret for JWT varification
const secretEncoded = new TextEncoder().encode(jwtSecret);
// set age for 3 days (days, hours, minutes, seconds)
const maxAge = 3 * 24 * 60 * 60;

const authController = {
  // method that will create a JWT with the user.id persisted in res.locals and our secret
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

  // method that will create cookies for user token and id
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

  // method that will verify that a user has a valid JWT, as well as verify that the JWT belongs to that user (keep the user from accessing other user workout pages)
  isAuthenticated: async (req: Request, _res: Response, next: NextFunction) => {
    const { token } = req.cookies as CookieVals;
    const { ssid } = req.cookies as CookieVals;
    const { user_id } = req.params;
    if (token) {
      try {
        const { payload } = await jwtStrat.jwtVerify(token, secretEncoded);
        if (user_id) {
          if (payload.id !== Number(ssid) || user_id !== ssid) {
            return next({
              log: "Error occured in authController.isAuthenticated",
              status: 401,
              message: { err: "Unable to verify token" },
            });
          }
          return next();
        }
        if (payload.id !== Number(ssid)) {
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
