import cors from "cors";
import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import "reflect-metadata";
import { errorHandler } from "./global/middleware";
import ApplicationRoutes from "./router";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

// middleware setup
app.use(cors());
app.use(helmet());
app.use(errorHandler);
app.use(morgan("dev"));
app.use(express.json());
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));
ApplicationRoutes(app);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("unexpected route! you miss road");
  next(error);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : {},
    },
  });
  next();
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
