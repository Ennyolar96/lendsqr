"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const helper_1 = require("../../global/helper");
const database_1 = require("../../global/database");
class UserServices {
    async findOne(query) {
        try {
            const { filters, joins, columns, orderBy } = this.filterFindOne(query);
            const user = await (0, helper_1.findOneWrapper)(database_1.model.user, {
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
    filterFindOne(query) {
        console.log(query);
        const { include, sort, select, ...filters } = query;
        const joins = [];
        const orderBy = [];
        const column = [];
        if (include) {
            include.map((item) => joins.push({
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
exports.UserServices = UserServices;
//# sourceMappingURL=services.js.map