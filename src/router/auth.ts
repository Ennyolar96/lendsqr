import { LoginUser, Registration } from "@/app/auth/controller";
import { Router } from "express";
const authRouter = Router();

authRouter.post("/register", Registration).post("/login", LoginUser);

export default authRouter;
