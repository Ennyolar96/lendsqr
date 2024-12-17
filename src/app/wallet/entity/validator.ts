import {
  IsCurrency,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { bankDetails, fundWallet, transferFund, withdraw } from "./interface";
import { Transform, Type } from "class-transformer";

export class FundWallet implements fundWallet {
  @IsCurrency()
  amount: number;
}

export class TransferFund implements transferFund {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  recipient: string;

  @IsCurrency()
  amount: number;

  @IsString()
  @IsOptional()
  currency: string = "NGN";

  @IsString()
  @IsOptional()
  description: string;
}

class BankDetails implements bankDetails {
  @IsString()
  @IsNotEmpty()
  bankCode: string;

  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  accountName: string;
}

export class Withdrawal implements withdraw {
  @IsCurrency()
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency: string = "NGN";

  @IsString()
  @IsOptional()
  description: string;

  @IsObject()
  @ValidateNested()
  @Type(() => BankDetails)
  bankDetails: bankDetails;
}
