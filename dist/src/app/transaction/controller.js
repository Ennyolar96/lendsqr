"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindTransaction = exports.FindTransactions = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const class_transformer_1 = require("class-transformer");
const entity_1 = require("./entity");
const class_validator_1 = require("class-validator");
const services_1 = require("./services");
const transaction = new services_1.TransactionServices();
exports.FindTransactions = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const query = (0, class_transformer_1.plainToInstance)(entity_1.FindManyTransaction, req.query);
        const errors = await (0, class_validator_1.validate)(query);
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
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
exports.FindTransaction = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const query = (0, class_transformer_1.plainToInstance)(entity_1.FindOneTransaction, req.query);
        const errors = await (0, class_validator_1.validate)(query);
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
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
//# sourceMappingURL=controller.js.map