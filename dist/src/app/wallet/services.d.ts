import { AuthUser } from "../auth/entity";
import { fundWallet, transferFund, withdraw } from "./entity";
export declare class WalletServices {
    fundWallet(data: fundWallet, user: AuthUser): Promise<{
        message: string;
    }>;
    withdrawalFund(data: withdraw, user: AuthUser): Promise<{
        message: string;
    }>;
    userBalance(user: AuthUser): Promise<any>;
    transferFund(data: transferFund, user: AuthUser): Promise<void>;
}
