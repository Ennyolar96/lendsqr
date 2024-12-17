import { db } from "../database";
import { FindOneWrapperOptions } from "../entity";

export const findOneWrapper = async <T>(
  tableName: string,
  options: FindOneWrapperOptions = {}
): Promise<T | null> => {
  const {
    filters = {},
    joins = [],
    columns = ["*"],
    orderBy = [],
    limit = 1,
    offset = 0,
  } = options;

  try {
    // Start the query
    let query = db(tableName).select(columns);

    // Apply joins
    joins.forEach(({ table, on, type = "inner" }) => {
      query = query.join(table, on[0], on[1], type);
    });

    // Apply filters
    if (Object.keys(filters).length > 0) {
      query = query.where(filters);
    }

    // Apply ordering
    orderBy.forEach(({ column, direction = "asc" }) => {
      query = query.orderBy(column, direction);
    });

    // Apply limit and offset
    if (limit) query = query.limit(limit);
    if (offset) query = query.offset(offset);

    // Execute the query and return the first result
    const result = await query.first();
    return result || null;
  } catch (error) {
    console.error("Error in findOneWrapper:", error);
    throw error;
  }
};
