"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionServices = void 0;
const database_1 = require("@/global/database");
const helper_1 = require("@/global/helper");
class TransactionServices {
    async createTransaction(data, transaction) {
        try {
            return (0, database_1.db)(database_1.model.transaction).transacting(transaction).insert(data);
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(query) {
        try {
            const { filters, joins, columns, orderBy } = this.findOneFilter(query);
            const user = await (0, helper_1.findOneWrapper)(database_1.model.transaction, {
                filters,
                joins,
                columns,
                orderBy,
            });
            return (0, helper_1.sanitizeSensitiveFields)(user);
        }
        catch (error) {
            throw error;
        }
    }
    async findMany(query) {
        try {
            const { filters, joins, columns, orderBy, page, limit } = this.findManyFilter(query);
            const response = await (0, helper_1.findManyWrapper)(database_1.model.transaction, {
                filters,
                joins,
                columns,
                orderBy,
                page,
                limit,
            });
            return (0, helper_1.sanitizeSensitiveFields)(response);
        }
        catch (error) {
            throw error;
        }
    }
    findManyFilter(query) {
        const { include, select, sort, page, limit, ...filters } = query;
        const joins = [];
        const orderBy = [];
        const column = [];
        if (include) {
            include.map((item) => joins.push({
                table: item,
                on: [`${item}.${database_1.model.user}`, `${database_1.model.user}.id`],
            }, {
                table: item,
                on: [`${item}.${database_1.model.user}`, `${database_1.model.user}.id`],
            }));
        }
        if (sort) {
            sort.map((item) => orderBy.push({
                column: item,
                direction: "desc",
            }));
        }
        if (select) {
            select.map((item) => {
                const parts = item.split(".");
                if (parts.length === 2) {
                    const camelCaseKey = `${parts[0]}${parts[1][0].toUpperCase()}${parts[1].slice(1)}`;
                    column.push(`${item} as ${camelCaseKey}`);
                }
                else {
                    column.push(item);
                }
            });
        }
        const columns = ["*"].concat(column);
        return { filters, joins, columns, orderBy, page, limit };
    }
    findOneFilter(query) {
        const { include, select, sort, ...filters } = query;
        const joins = [];
        const orderBy = [];
        const column = [];
        if (include) {
            include.map((item) => joins.push({
                table: item,
                on: [`${item}.${database_1.model.user}`, `${database_1.model.user}.id`],
            }, {
                table: item,
                on: [`${item}.${database_1.model.user}`, `${database_1.model.user}.id`],
            }));
        }
        if (sort) {
            sort.map((item) => orderBy.push({
                column: item,
                direction: "desc",
            }));
        }
        if (select) {
            select.map((item) => {
                const parts = item.split(".");
                if (parts.length === 2) {
                    const camelCaseKey = `${parts[0]}${parts[1][0].toUpperCase()}${parts[1].slice(1)}`;
                    column.push(`${item} as ${camelCaseKey}`);
                }
                else {
                    column.push(item);
                }
            });
        }
        const columns = ["*"].concat(column);
        return { filters, joins, columns, orderBy };
    }
}
exports.TransactionServices = TransactionServices;
//# sourceMappingURL=services.js.map