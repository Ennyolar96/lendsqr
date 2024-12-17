"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userBalance = exports.withdrawFund = exports.inAppTransfer = exports.fundWallet = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const entity_1 = require("./entity");
const services_1 = require("./services");
const walletServices = new services_1.WalletServices();
exports.fundWallet = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const body = (0, class_transformer_1.plainToInstance)(entity_1.FundWallet, req.body);
        const errors = await (0, class_validator_1.validate)(body);
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
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.inAppTransfer = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const body = (0, class_transformer_1.plainToInstance)(entity_1.TransferFund, req.body);
        const errors = await (0, class_validator_1.validate)(body);
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
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.withdrawFund = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const body = (0, class_transformer_1.plainToInstance)(entity_1.Withdrawal, req.body);
        const errors = await (0, class_validator_1.validate)(body);
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
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.userBalance = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const response = await walletServices.userBalance(req.user);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//# sourceMappingURL=controller.js.map