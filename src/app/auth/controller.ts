import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { AuthService } from "./services";
import { plainToInstance } from "class-transformer";
import { SignIn, SignUp } from "./entity";
import { validate } from "class-validator";

const authService = new AuthService();

export const Registration = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const body = plainToInstance(SignUp, req.body);
      const errors = await validate(body);

      if (errors.length > 0) {
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          message: error.constraints,
        }));
        res.status(400).json(formattedErrors);
        return;
      }
      const user = await authService.CreateNewUser(body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

export const LoginUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const body = plainToInstance(SignIn, req.body);
    const errors = await validate(body);
    if (errors.length > 0) {
      const formattedErrors = errors.map((error) => ({
        field: error.property,
        message: error.constraints,
      }));
      res.status(400).json(formattedErrors);
      return;
    }
    const user = await authService.login(body);
    res.status(201).json(user);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
