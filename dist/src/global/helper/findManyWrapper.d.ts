import { FindManyWrapperOptions } from "../entity";
export declare const findManyWrapper: <T>(tableName: string, options?: FindManyWrapperOptions) => Promise<{
    data: T[];
    pagination: {
        currentPage: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
        totalRecords: number;
        limit: number;
    };
}>;
