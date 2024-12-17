"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = exports.Registration = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const services_1 = require("./services");
const class_transformer_1 = require("class-transformer");
const entity_1 = require("./entity");
const class_validator_1 = require("class-validator");
const authService = new services_1.AuthService();
exports.Registration = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const body = (0, class_transformer_1.plainToInstance)(entity_1.SignUp, req.body);
        const errors = await (0, class_validator_1.validate)(body);
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
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.LoginUser = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const body = (0, class_transformer_1.plainToInstance)(entity_1.SignIn, req.body);
        const errors = await (0, class_validator_1.validate)(body);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});
//# sourceMappingURL=controller.js.map