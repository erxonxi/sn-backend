import { Primitives } from '../../../../Shared/Domain/Primitives';
import { Query } from '../../../../Shared/Domain/Query';
import { QueryHandler } from '../../../../Shared/Domain/QueryHandler';
import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { Feed } from '../../Domain/Feed';
import { GetFeedQuery } from '../../Domain/Query/GetFeedQuery';
import { GetFeed } from './GetFeed';

export class GetFeedQueryHandler implements QueryHandler<GetFeedQuery, Primitives<Feed>> {
  constructor(private service: GetFeed) {}

  subscribedTo(): Query {
    return GetFeedQuery;
  }

  async handle(query: GetFeedQuery): Promise<any> {
    const userId = new UserId(query.userId);
    const feed = await this.service.execute(userId);
    return feed.toPrimitives();
  }
}
