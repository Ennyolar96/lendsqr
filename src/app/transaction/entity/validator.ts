import { FindMany, FindOne } from "@/global/entity";
import {
  findManyTransaction,
  findOneTransaction,
  Method,
  PaymentStatus,
} from "./interface";
import { IsIn, IsInt, IsOptional, IsString, IsUUID } from "class-validator";

export class FindManyTransaction
  extends FindMany
  implements findManyTransaction
{
  @IsString({ each: true })
  @IsUUID()
  @IsOptional()
  wallet?: string[];

  @IsString({ each: true })
  @IsUUID()
  @IsOptional()
  user?: string[];

  @IsString({ each: true })
  @IsOptional()
  @IsIn(Object.values(Method))
  @IsString()
  method?: Method[];

  @IsString({ each: true })
  @IsOptional()
  @IsIn(Object.values(PaymentStatus))
  status?: PaymentStatus[];

  @IsInt()
  @IsOptional()
  @IsOptional()
  reference?: number[];
}

export class FindOneTransaction extends FindOne implements findOneTransaction {
  @IsString({ each: true })
  @IsUUID()
  @IsOptional()
  wallet?: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  user?: string;

  @IsString()
  @IsOptional()
  @IsIn(Object.values(Method))
  @IsString()
  method?: Method;

  @IsString()
  @IsOptional()
  @IsIn(Object.values(PaymentStatus))
  status?: PaymentStatus;

  @IsInt()
  @IsOptional()
  reference?: number;
}
