import { IsIn, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { findMany, findOne } from "./interface";
import { Transform } from "class-transformer";
import { model } from "../database";

export class FindMany implements findMany {
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  include?: Array<String>;

  @IsOptional()
  @Transform((v) => (typeof v.value === "string" ? [v.value] : v.value))
  @IsString({ each: true })
  sort?: string[] = ["updatedAt"];

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Transform((v) => parseInt(v.value, 10))
  limit?: number = 30;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform((v) => parseInt(v.value, 10))
  page?: number = 1;

  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  select?: string[];
}

export class FindOne implements findOne {
  @IsString()
  @IsOptional()
  id: string;

  @IsString({ each: true })
  @IsOptional()
  @IsIn(Object.values(model))
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  include?: Array<String>;

  @IsOptional()
  @Transform((v) => (typeof v.value === "string" ? [v.value] : v.value))
  @IsString({ each: true })
  sort?: string[] = ["updatedAt"];

  @IsOptional()
  @Transform((v) => (typeof v.value === "string" ? [v.value] : v.value))
  @IsString({ each: true })
  select?: string[];
}
