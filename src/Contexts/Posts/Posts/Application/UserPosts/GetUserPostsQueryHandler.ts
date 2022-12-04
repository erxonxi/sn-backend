import { Primitives } from '../../../../Shared/Domain/Primitives';
import { Query } from '../../../../Shared/Domain/Query';
import { QueryHandler } from '../../../../Shared/Domain/QueryHandler';
import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { Post } from '../../Domain/Post';
import { GetUserPostsQuery } from '../../Domain/Query/GetUserPostsQuery';
import { GetUserPosts } from './GetUserPosts';

export class GetUserPostsQueryHandler
  implements QueryHandler<GetUserPostsQuery, Primitives<Post>[]>
{
  constructor(private service: GetUserPosts) {}

  subscribedTo(): Query {
    return GetUserPostsQuery;
  }

  handle(query: GetUserPostsQuery): Promise<Primitives<Post>[]> {
    const userId = new UserId(query.userId);
    return this.service.execute(userId);
  }
}
