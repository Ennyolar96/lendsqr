"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOneWrapper = void 0;
const database_1 = require("../database");
const findOneWrapper = async (tableName, options = {}) => {
    const { filters = {}, joins = [], columns = ["*"], orderBy = [], limit = 1, offset = 0, } = options;
    try {
        let query = (0, database_1.db)(tableName).select(columns);
        joins.forEach(({ table, on, type = "inner" }) => {
            query = query.join(table, on[0], on[1], type);
        });
        if (Object.keys(filters).length > 0) {
            query = query.where(filters);
        }
        orderBy.forEach(({ column, direction = "asc" }) => {
            query = query.orderBy(column, direction);
        });
        if (limit)
            query = query.limit(limit);
        if (offset)
            query = query.offset(offset);
        const result = await query.first();
        return result || null;
    }
    catch (error) {
        console.error("Error in findOneWrapper:", error);
        throw error;
    }
};
exports.findOneWrapper = findOneWrapper;
//# sourceMappingURL=findOneWrapper.js.map