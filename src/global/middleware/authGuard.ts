import { NextFunction, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../entity";
import { UserServices } from "@/app/user/services";

interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

const userService = new UserServices();
export const AuthGuard = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader?.startsWith("Bearer ")) {
        res.status(401);
        throw new Error("Authentication required");
      }

      const token = authHeader.split(" ")[1];

      if (!token) {
        res.status(401);
        throw new Error("Authentication token required");
      }

      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

      if (!decoded.id) {
        res.status(401);
        throw new Error("Invalid token format");
      }

      const user = await userService.findOne({ id: decoded.id });

      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }

      if (user.isBlacklisted) {
        res.status(403);
        throw new Error("Account found on blacklist");
      }

      req.user = user;
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401);
        throw new Error("Invalid or expired token");
      }

      if (error instanceof Error) {
        throw error;
      }

      // Handle unexpected errors
      console.error("Authentication error:", error);
      res.status(500);
      throw new Error("Authentication failed");
    }
  }
);
