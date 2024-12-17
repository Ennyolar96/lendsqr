"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const wallet_1 = __importDefault(require("./wallet"));
const ApplicationRoutes = (app) => {
    app.use("/api/v1/auth", auth_1.default);
    app.use("/api/v1/", user_1.default);
    app.use("/api/v1/wallet/", wallet_1.default);
};
exports.default = ApplicationRoutes;
//# sourceMappingURL=index.js.map