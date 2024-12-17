import { signIn, signUp } from "./entity";
import { IUser } from "../user/entity";
export declare class AuthService {
    CreateNewUser(data: signUp): Promise<any>;
    login(data: signIn): Promise<IUser>;
    private hashPassword;
    private assignToken;
}
