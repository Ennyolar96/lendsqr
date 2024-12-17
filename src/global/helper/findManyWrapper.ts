import { db } from "../database";
import { FindManyWrapperOptions } from "../entity";

export const findManyWrapper = async <T>(
  tableName: string,
  options: FindManyWrapperOptions = {}
): Promise<{
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
    totalRecords: number;
    limit: number;
  };
}> => {
  const {
    filters = {},
    joins = [],
    columns = ["*"],
    orderBy = [],
    page = 1,
    limit = 10,
  } = options;

  try {
    let query = db(tableName).select(columns);

    joins.forEach(({ table, on, type = "inner" }) => {
      query = query.join(table, on[0], on[1], type);
    });

    if (Object.keys(filters).length > 0) {
      query = query.where(filters);
    }

    orderBy.forEach(({ column, direction = "asc" }) => {
      query = query.orderBy(column, direction);
    });

    const offset = (page - 1) * limit;

    const totalRecordsQuery: any = db(tableName).count("* as count");
    if (Object.keys(filters).length > 0) {
      totalRecordsQuery.where(filters);
    }
    const [{ count: totalRecords }] = await totalRecordsQuery;

    const data = await query.limit(limit).offset(offset);

    const totalPages = Math.ceil(totalRecords / limit);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    return {
      data,
      pagination: {
        currentPage: page,
        totalPages,
        hasNext,
        hasPrevious,
        totalRecords: Number(totalRecords),
        limit,
      },
    };
  } catch (error) {
    console.error("Error in findManyWrapper:", error);
    throw error;
  }
};
