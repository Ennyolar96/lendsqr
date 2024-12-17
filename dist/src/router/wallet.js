"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("@/app/transaction/controller");
const controller_2 = require("@/app/wallet/controller");
const middleware_1 = require("@/global/middleware");
const express_1 = require("express");
const walletRouter = (0, express_1.Router)();
walletRouter.post("/fund", middleware_1.AuthGuard, controller_2.fundWallet);
walletRouter.post("/transfer", middleware_1.AuthGuard, controller_2.inAppTransfer);
walletRouter.post("/withdraw", middleware_1.AuthGuard, controller_2.withdrawFund);
walletRouter.get("/balance", middleware_1.AuthGuard, controller_2.userBalance);
walletRouter.get("/transaction", middleware_1.AuthGuard, controller_1.FindTransaction);
walletRouter.get("/transactions", middleware_1.AuthGuard, controller_1.FindTransactions);
exports.default = walletRouter;
//# sourceMappingURL=wallet.js.map