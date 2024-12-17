"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../app/user/controller");
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
userRouter.get("/user", controller_1.findOneUser);
exports.default = userRouter;
//# sourceMappingURL=user.js.map