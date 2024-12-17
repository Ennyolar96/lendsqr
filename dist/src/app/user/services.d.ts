import { findOneUser, IUser } from "./entity";
export declare class UserServices {
    findOne(query: findOneUser): Promise<IUser>;
    private filterFindOne;
}
