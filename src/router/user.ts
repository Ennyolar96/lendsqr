import { findOneUser } from "@/app/user/controller";
import { Router } from "express";
const userRouter = Router();

userRouter.get("/user", findOneUser);

export default userRouter;
