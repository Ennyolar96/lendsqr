import { AuthRequest } from "@/global/entity";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Response } from "express";
import asyncHandler from "express-async-handler";
import { FundWallet, TransferFund, Withdrawal } from "./entity";
import { WalletServices } from "./services";

const walletServices = new WalletServices();
export const fundWallet = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    try {
      const body = plainToInstance(FundWallet, req.body);
      const errors = await validate(body);
      if (errors.length > 0) {
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          message: error.constraints,
        }));
        res.status(400).json(formattedErrors);
        return;
      }

      const response = await walletServices.fundWallet(body, req.user);
      res.status(201).json(response);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

export const inAppTransfer = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    try {
      const body = plainToInstance(TransferFund, req.body);
      const errors = await validate(body);
      if (errors.length > 0) {
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          message: error.constraints,
        }));
        res.status(400).json(formattedErrors);
        return;
      }

      const response = await walletServices.transferFund(body, req.user);
      res.status(201).json(response);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

export const withdrawFund = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    try {
      const body = plainToInstance(Withdrawal, req.body);
      const errors = await validate(body);
      if (errors.length > 0) {
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          message: error.constraints,
        }));
        res.status(400).json(formattedErrors);
        return;
      }

      const response = await walletServices.withdrawalFund(body, req.user);
      res.status(201).json(response);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

export const userBalance = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    try {
      const response = await walletServices.userBalance(req.user);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);
