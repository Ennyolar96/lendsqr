"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const services_1 = require("../../app/user/services");
const userService = new services_1.UserServices();
exports.AuthGuard = (0, express_async_handler_1.default)(async (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
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
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(401);
            throw new Error("Invalid or expired token");
        }
        if (error instanceof Error) {
            throw error;
        }
        console.error("Authentication error:", error);
        res.status(500);
        throw new Error("Authentication failed");
    }
});
//# sourceMappingURL=authGuard.js.map