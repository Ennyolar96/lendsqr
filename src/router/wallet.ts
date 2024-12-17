import {
  FindTransaction,
  FindTransactions,
} from "@/app/transaction/controller";
import {
  fundWallet,
  inAppTransfer,
  userBalance,
  withdrawFund,
} from "@/app/wallet/controller";
import { AuthGuard } from "@/global/middleware";
import { Router } from "express";

const walletRouter = Router();
walletRouter.post("/fund", AuthGuard, fundWallet);
walletRouter.post("/transfer", AuthGuard, inAppTransfer);
walletRouter.post("/withdraw", AuthGuard, withdrawFund);
walletRouter.get("/balance", AuthGuard, userBalance);
walletRouter.get("/transaction", AuthGuard, FindTransaction);
walletRouter.get("/transactions", AuthGuard, FindTransactions);

export default walletRouter;
