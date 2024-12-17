export declare enum Role {
    ADMIN = "admin",
    USER = "user"
}
export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age: number;
    role: Role;
    isActive: boolean;
    bvn: number;
    createdAt: Date;
    updatedAt: Date;
}
