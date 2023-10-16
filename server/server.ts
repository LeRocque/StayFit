import express, {
  Express,
  Request,
  Response,
  ErrorRequestHandler,
} from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import workoutRouter from "./routes/workoutRouter";
import userRouter from "./routes/userRouter";

const app: Express = express();

// PORT will default to env variable if given, else it will use 3000 (this is used for Heroku)
const PORT = process.env.PORT || 3000;

// Parse incoming urlcoded content and put in req.body
app.use(express.urlencoded({ extended: true }));
// Parse incoming JSON content and put in req.body
app.use(express.json());
// Parse incoming cookies and put in req.cookies
app.use(cookieParser());
// Enable CORS to prevent potential errors
app.use(cors());

app.use("/workout", workoutRouter);
app.use("/user", userRouter);

// If env is prod, serve our static bundle
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "dist")));
  app.get("/*", (_req, res) => {
    return res.sendFile(path.join(path.resolve(), "dist", "index.html"));
  });
}

// Catch-all error handler
app.use("*", (_req, res) => {
  console.log("Catch-All Hit");
  return res.status(404).send("This page can't be found");
});

// Global error handler
app.use((err: ErrorRequestHandler, _req: Request, res: Response) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An unknown error occurred" },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Get err goin' on ${PORT}`);
});
