import { FindOne } from "@/global/entity";
import { findOneUser } from "./interface";
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";

export class updateUser {}

export class FindOneUser extends FindOne implements findOneUser {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber: number;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsInt()
  @IsOptional()
  bvn: number;
}
