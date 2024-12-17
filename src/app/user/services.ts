import { findOneUser, IUser } from "./entity";
import { findOneWrapper, sanitizeSensitiveFields } from "@/global/helper";
import { model } from "@/global/database";
import { JoinDefinition, OrderByDefinition } from "@/global/entity";

export class UserServices {
  public async findOne(query: findOneUser) {
    try {
      const { filters, joins, columns, orderBy } = this.filterFindOne(query);
      const user = await findOneWrapper<IUser>(model.user, {
        filters,
        joins,
        columns,
        orderBy,
      });

      return sanitizeSensitiveFields(user) as IUser | null;
    } catch (error) {
      throw error;
    }
  }

  private filterFindOne(query: findOneUser) {
    console.log(query);
    const { include, sort, select, ...filters } = query;
    const joins: JoinDefinition[] = [];
    const orderBy: OrderByDefinition[] = [];
    const column: string[] = [];
    if (include) {
      include.map((item: string) =>
        joins.push({
          table: item,
          on: [`${item}.${model.user}`, `${model.user}.id`],
        })
      );
    }

    if (sort) {
      sort.map((item: string) =>
        orderBy.push({
          column: item,
          direction: "desc",
        })
      );
    }

    if (select) {
      select.map((item: string) => {
        const parts = item.split(".");

        if (parts.length === 2) {
          const camelCaseKey = `${
            parts[0]
          }${parts[1][0].toUpperCase()}${parts[1].slice(1)}`;
          column.push(`${item} as ${camelCaseKey}`);
        } else {
          column.push(item);
        }
      });
    }
    const columns = ["*"].concat(column);
    return { filters, joins, columns, orderBy };
  }
}
