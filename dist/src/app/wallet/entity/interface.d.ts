import { Role } from "../../../app/user/entity";
export interface IWallet {
    id?: string;
    user: string;
    balance: number;
    currency: string;
    role: Role;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface ITransaction {
    id: string;
    reference: string;
    status: string;
    amount: number;
    currency: string;
    paidAt: Date;
    customer: {
        email: string;
    };
}
export interface fundWallet extends Pick<ITransaction, "amount"> {
}
export interface transferFund {
    recipient: string;
    amount: number;
    currency: string;
    description: string;
}
export interface bankDetails {
    bankCode: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
}
export interface withdraw {
    amount: number;
    currency: string;
    description: string;
    bankDetails: bankDetails;
}
