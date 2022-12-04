import { Filters } from '../../../../Shared/Domain/criteria/Filters';
import { Order } from '../../../../Shared/Domain/criteria/Order';
import { Query } from '../../../../Shared/Domain/Query';
import { QueryHandler } from '../../../../Shared/Domain/QueryHandler';
import { UsersResponse } from '../UsersResponse';
import { SearchUsers } from './SearchUsers';
import { SearchUsersQuery } from './SearchUsersQuery';

export class SearchUsersQueryHandler implements QueryHandler<SearchUsersQuery, UsersResponse> {
  constructor(private searcher: SearchUsers) {}

  subscribedTo(): Query {
    return SearchUsersQuery;
  }

  handle(query: SearchUsersQuery): Promise<UsersResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);

    return this.searcher.run(filters, order, query.offset, query.limit);
  }
}
