import { findManyTransaction, findOneTransaction, ITransaction } from "./entity";
export declare class TransactionServices {
    createTransaction(data: ITransaction, transaction?: any): Promise<ITransaction>;
    findOne(query: findOneTransaction): Promise<ITransaction>;
    findMany(query: findManyTransaction): Promise<{
        data: ITransaction[];
        pagination: {
            currentPage: number;
            totalPages: number;
            hasNext: boolean;
            hasPrevious: boolean;
            totalRecords: number;
            limit: number;
        };
    } | {
        data: ITransaction[];
        pagination: {
            currentPage: number;
            totalPages: number;
            hasNext: boolean;
            hasPrevious: boolean;
            totalRecords: number;
            limit: number;
        };
    }[]>;
    private findManyFilter;
    private findOneFilter;
}
