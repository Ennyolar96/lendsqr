import { signIn, signUp } from "./interface";
export declare class SignUp implements signUp {
    firstName: string;
    lastName: string;
    phoneNumber: number;
    email: string;
    password: string;
}
export declare class SignIn implements signIn {
    email: string;
    password: string;
}
