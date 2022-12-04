import { Query } from '../../Domain/Query';
import { QueryHandler } from '../../Domain/QueryHandler';
import { QueryNotRegisteredError } from '../../Domain/QueryNotRegisteredError';
import { Response } from '../../Domain/Response';

export class QueryHandlers extends Map<Query, QueryHandler<Query, Response>> {
  constructor(queryHandlers: Array<QueryHandler<Query, Response>>) {
    super();
    queryHandlers.forEach(queryHandler => {
      this.set(queryHandler.subscribedTo(), queryHandler);
    });
  }

  public get(query: Query): QueryHandler<Query, Response> {
    const queryHandler = super.get(query.constructor);

    if (!queryHandler) {
      throw new QueryNotRegisteredError(query);
    }

    return queryHandler;
  }
}
