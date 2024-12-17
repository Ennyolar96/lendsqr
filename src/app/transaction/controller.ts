import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { FindManyTransaction, FindOneTransaction } from "./entity";
import { validate } from "class-validator";
import { TransactionServices } from "./services";

const transaction = new TransactionServices();
export const FindTransactions = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const query = plainToInstance(FindManyTransaction, req.query);
      const errors = await validate(query);
      if (errors.length > 0) {
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          message: error.constraints,
        }));
        res.status(400).json(formattedErrors);
        return;
      }
      const transactions = await transaction.findMany(query);
      res.status(200).json(transactions);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
);

export const FindTransaction = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const query = plainToInstance(FindOneTransaction, req.query);
      const errors = await validate(query);
      if (errors.length > 0) {
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          message: error.constraints,
        }));
        res.status(400).json(formattedErrors);
        return;
      }
      const transactions = await transaction.findOne(query);
      res.status(200).json(transactions);
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
);
