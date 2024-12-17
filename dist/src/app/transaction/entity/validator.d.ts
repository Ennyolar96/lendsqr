import { FindMany, FindOne } from "@/global/entity";
import { findManyTransaction, findOneTransaction, Method, PaymentStatus } from "./interface";
export declare class FindManyTransaction extends FindMany implements findManyTransaction {
    wallet?: string[];
    user?: string[];
    method?: Method[];
    status?: PaymentStatus[];
    reference?: number[];
}
export declare class FindOneTransaction extends FindOne implements findOneTransaction {
    wallet?: string;
    user?: string;
    method?: Method;
    status?: PaymentStatus;
    reference?: number;
}
