import { Application } from "express";
import authRouter from "./auth";
import userRouter from "./user";
import walletRouter from "./wallet";

const ApplicationRoutes = (app: Application) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/", userRouter);
  app.use("/api/v1/wallet/", walletRouter);
};

export default ApplicationRoutes;
