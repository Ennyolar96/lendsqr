import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { UserServices } from "./services";
import { plainToInstance } from "class-transformer";
import { FindOneUser } from "./entity";
import { validate } from "class-validator";

const userServices = new UserServices();

export const findOneUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const query = plainToInstance(FindOneUser, req.query);
    const errors = await validate(query);

    if (errors.length > 0) {
      const formattedErrors = errors.map((error) => ({
        field: error.property,
        message: error.constraints,
      }));
      res.status(400).json(formattedErrors);
      return;
    }

    const user = await userServices.findOne(query);
    res.status(200).json(user);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
