import { AuthUser } from "@/app/auth/entity";
import { Request } from "express";

export interface AuthRequest extends Request {
  user: AuthUser;
}

export interface findOne {
  id?: string;
  include?: Array<String>;
  sort?: string[];
  select?: string[];
}

export interface findMany {
  include?: Array<String>;
  sort?: string[];
  select?: string[];
  limit?: number;
  page?: number;
}

type JoinType = "inner" | "left" | "right" | "full";

export interface FindOneWrapperOptions {
  filters?: Record<string, any>;
  joins?: JoinDefinition[];
  columns?: string[];
  orderBy?: OrderByDefinition[];
  limit?: number;
  offset?: number;
}

export interface JoinDefinition {
  table: string;
  on: [string, string];
  type?: JoinType;
}

export interface OrderByDefinition {
  column: string;
  direction?: "asc" | "desc";
}

export interface FindManyWrapperOptions {
  filters?: Record<string, any>;
  joins?: JoinDefinition[];
  columns?: string[];
  orderBy?: OrderByDefinition[];
  page?: number;
  limit?: number;
}
