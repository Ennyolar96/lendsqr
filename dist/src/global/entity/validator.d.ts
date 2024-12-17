import { findMany, findOne } from "./interface";
export declare class FindMany implements findMany {
    include?: Array<String>;
    sort?: string[];
    limit?: number;
    page?: number;
    select?: string[];
}
export declare class FindOne implements findOne {
    id: string;
    include?: Array<String>;
    sort?: string[];
    select?: string[];
}
