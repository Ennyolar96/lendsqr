import { findOne } from "@/global/entity";
export declare enum Role {
    ADMIN = "admin",
    USER = "user"
}
export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
    email: string;
    password: string;
    age: number;
    role: Role;
    isActive: boolean;
    isBlacklisted: boolean;
    bvn: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface findOneUser extends findOne {
    firstName?: string;
    lastName?: string;
    phoneNumber?: number;
    email?: string;
    bvn?: number;
}
