import { db, model } from "@/global/database";
import {
  findManyTransaction,
  findOneTransaction,
  ITransaction,
} from "./entity";
import { JoinDefinition, OrderByDefinition } from "@/global/entity";
import {
  findManyWrapper,
  findOneWrapper,
  sanitizeSensitiveFields,
} from "@/global/helper";

export class TransactionServices {
  public async createTransaction(
    data: ITransaction,
    transaction?: any
  ): Promise<ITransaction> {
    try {
      return db(model.transaction).transacting(transaction).insert(data);
    } catch (error) {
      throw error;
    }
  }

  public async findOne(query: findOneTransaction) {
    try {
      const { filters, joins, columns, orderBy } = this.findOneFilter(query);
      const user = await findOneWrapper<ITransaction>(model.transaction, {
        filters,
        joins,
        columns,
        orderBy,
      });

      return sanitizeSensitiveFields(user) as ITransaction | null;
    } catch (error) {
      throw error;
    }
  }
  public async findMany(query: findManyTransaction) {
    try {
      const { filters, joins, columns, orderBy, page, limit } =
        this.findManyFilter(query);
      const response = await findManyWrapper<ITransaction>(model.transaction, {
        filters,
        joins,
        columns,
        orderBy,
        page,
        limit,
      });

      return sanitizeSensitiveFields(response);
    } catch (error) {
      throw error;
    }
  }

  private findManyFilter(query: findManyTransaction) {
    const { include, select, sort, page, limit, ...filters } = query;

    const joins: JoinDefinition[] = [];
    const orderBy: OrderByDefinition[] = [];
    const column: string[] = [];

    if (include) {
      include.map((item: string) =>
        joins.push(
          {
            table: item,
            on: [`${item}.${model.user}`, `${model.user}.id`],
          },
          {
            table: item,
            on: [`${item}.${model.user}`, `${model.user}.id`],
          }
        )
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
    return { filters, joins, columns, orderBy, page, limit };
  }

  private findOneFilter(query: findOneTransaction) {
    const { include, select, sort, ...filters } = query;

    const joins: JoinDefinition[] = [];
    const orderBy: OrderByDefinition[] = [];
    const column: string[] = [];

    if (include) {
      include.map((item: string) =>
        joins.push(
          {
            table: item,
            on: [`${item}.${model.user}`, `${model.user}.id`],
          },
          {
            table: item,
            on: [`${item}.${model.user}`, `${model.user}.id`],
          }
        )
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
