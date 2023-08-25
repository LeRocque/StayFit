import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as jwtStrat from "jose";

const jwtSecret = process.env.JWT_SECRET || "";
const secretEncoded = new TextEncoder().encode(jwtSecret);
const maxAge = 3 * 24 * 60 * 60;

const authController = {
  assignJwt: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = res.locals;
      const token = await jwt.sign({ id }, jwtSecret, {
        expiresIn: maxAge,
      });
      res.locals.token = token;
      return next();
    } catch (err) {
      return next({
        log: `Error occured in authController.assignJwt ${err}`,
        status: 500,
        message: { err: "Unable to assign token" },
      });
    }
  },

  cookieCreator: async (_req: Request, res: Response, next: NextFunction) => {
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
      return next({
        log: `Error occured in authController.cookieCreator ${err}`,
        status: 500,
        message: { err: "Unable to create cookie" },
      });
    }
  },

  isAuthenticated: async (req: Request, _res: Response, next: NextFunction) => {
    if (req.cookies.token) {
      try {
        const { token } = req.cookies;
        const { ssid } = req.cookies;
        const { user_id } = req.params;
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
        return next({
          log: `Error occured in authController.isAuthenticated ${err}`,
          status: 500,
          message: { err: "Unable to verify token" },
        });
      }
    }
    return next({
      log: "Error occured in authController.isAuthenticated",
      status: 401,
      message: { err: "Unable to verify token" },
    });
  },
};

export default authController;
