import bcrypt from "bcryptjs";
import db from "../models/dbModel";
import { Response, NextFunction } from "express";
import { DbQuery, ReqBodyUser, UserRequest, UserRow } from "../backendTypes";

const userController = {
  createUser: async (req: UserRequest, res: Response, next: NextFunction) => {
    const { email, firstName, lastName, address, username, password } =
      req.body as ReqBodyUser;
    // if all fields are passed in, check if username already exists, if so return 'Username exists'
    if (email && firstName && lastName && address && username && password) {
      try {
        let queryString = "SELECT user_id FROM users WHERE username=($1)";
        let result = (await db.query(queryString, [username])) as DbQuery;
        const userRow = result.rows[0] as UserRow | undefined;
        if (userRow) {
          return res
            .status(401)
            .json("Username already exists, please select another");
        } else {
          // if username does not exist, hash the password, then add fields with hashed password to users table, assign user_id to res.locals.id,  finally return next
          const hashed = await bcrypt.hash(password, 10);
          queryString =
            "INSERT INTO users (email, firstName, lastName, address, username, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id";
          result = (await db.query(queryString, [
            email,
            firstName,
            lastName,
            address,
            username,
            hashed,
          ])) as DbQuery;
          res.locals.id = result.rows[0].user_id as UserRow;
          return next();
        }
      } catch (err) {
        const error: string = err as string;
        return next({
          log: `Error in userController.createUser: ${error}`,
          status: 500,
          message: "unable to create account",
        });
      }
    }
    return res.status(400).json("Please fill out all fields");
  },
  verifyUser: async (req: UserRequest, res: Response, next: NextFunction) => {
    const { username, password } = req.body as ReqBodyUser;
    // if username and password are passed in, select user_id, username, and password from DB where username matches input username
    if (username && password) {
      try {
        const queryString =
          "SELECT user_id, username, password FROM users WHERE username = $1";
        const result = (await db.query(queryString, [username])) as DbQuery;
        if (!result.rows[0]) {
          return res.status(401).json("Invalid username or password");
        }
        // check if stored hashed password matches input password, if so assign user_id to res.locals.id and return next, else response with invalid username or password
        if (result.rows[0].password) {
          const compare = await bcrypt.compare(
            password,
            result.rows[0].password,
          );
          if (compare) {
            res.locals.id = result.rows[0].user_id;
            return next();
          } else {
            return res.status(401).json("Invalid username or password");
          }
        }
      } catch (err) {
        const error: string = err as string;
        return next({
          log: `Error in verifyUser: ${error}`,
          status: 500,
          message: "Error verifying account",
        });
      }
    }
    return res.status(400).json("Please enter a username and password");
  },

  logout: (_req: UserRequest, res: Response, next: NextFunction) => {
    res
      .clearCookie("ssid", { httpOnly: true })
      .clearCookie("token", { httpOnly: true });
    return next();
  },
  deleteUser: async (req: UserRequest, res: Response, next: NextFunction) => {
    const {user_id} = req.params;
    try {
      const queryString ='DELETE from users WHERE user_id=$1 RETURNING *'
      const result = await db.query(queryString, [user_id]) as DbQuery;
      res.locals.deleted = result;
      return next();
    }catch (err) {
      const error: string = err as string;
      return next({
        log: `Error in deleteUser: ${error}`,
        status: 500,
        message: "Error deleting account",
      });
    }
  }
};

export default userController;
