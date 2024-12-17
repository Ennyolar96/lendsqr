import { IUser } from "@/app/user/entity";

export interface signUp
  extends Pick<
    IUser,
    "firstName" | "email" | "lastName" | "password" | "phoneNumber"
  > {}

export interface signIn extends Pick<signUp, "email" | "password"> {}

export interface AuthUser
  extends Pick<
    IUser,
    "id" | "firstName" | "lastName" | "email" | "phoneNumber" | "role"
  > {}
