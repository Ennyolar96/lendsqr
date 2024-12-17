import { FindOneWrapperOptions } from "../entity";
export declare const findOneWrapper: <T>(tableName: string, options?: FindOneWrapperOptions) => Promise<T | null>;
