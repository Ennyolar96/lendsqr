import { findMany, findOne } from "@/global/entity";

export enum PaymentStatus {
  PENDING = "pending",
  FAILED = "failed",
  SUCCESS = "successful",
  PROCESSING = "processing",
  REFUNDED = "refunded",
  REVERSED = "reversed",
  REJECTED = "rejected",
  REJECTED_BY_SYSTEM = "rejected_by_system",
}

export enum Method {
  withdrawal = "Withdrawal",
  transfer = "Transfer",
  deposit = "Deposit",
  fund = "Fund",
}

export interface ITransaction {
  id?: string;
  user: string;
  wallet: string;
  amount: number;
  reference: number;
  description: string;
  method: Method;
  status: PaymentStatus;
  metadata: string | string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface findManyTransaction extends findMany {
  wallet?: string[];
  user?: string[];
  method?: Method[];
  status?: PaymentStatus[];
  reference?: number[];
}

export interface findOneTransaction extends findOne {
  wallet?: string;
  user?: string;
  method?: Method;
  status?: PaymentStatus;
  reference?: number;
}
