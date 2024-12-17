import { FindOne } from "../../../global/entity";
import { findOneUser } from "./interface";
export declare class updateUser {
}
export declare class FindOneUser extends FindOne implements findOneUser {
    firstName: string;
    lastName: string;
    phoneNumber: number;
    email: string;
    bvn: number;
}
