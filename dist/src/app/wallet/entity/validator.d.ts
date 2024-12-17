import { bankDetails, fundWallet, transferFund, withdraw } from "./interface";
export declare class FundWallet implements fundWallet {
    amount: number;
}
export declare class TransferFund implements transferFund {
    recipient: string;
    amount: number;
    currency: string;
    description: string;
}
export declare class Withdrawal implements withdraw {
    amount: number;
    currency: string;
    description: string;
    bankDetails: bankDetails;
}
