"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOneUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const services_1 = require("./services");
const class_transformer_1 = require("class-transformer");
const entity_1 = require("./entity");
const class_validator_1 = require("class-validator");
const userServices = new services_1.UserServices();
exports.findOneUser = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const query = (0, class_transformer_1.plainToInstance)(entity_1.FindOneUser, req.query);
        const errors = await (0, class_validator_1.validate)(query);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});
//# sourceMappingURL=controller.js.map