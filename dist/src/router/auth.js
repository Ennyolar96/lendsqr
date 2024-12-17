"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../app/auth/controller");
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
authRouter.post("/register", controller_1.Registration).post("/login", controller_1.LoginUser);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map