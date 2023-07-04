import { Request } from "express";

type UserRequest = Request & {
  body: {
    email?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    username: string;
    password: string;
  };
};

export default UserRequest;
