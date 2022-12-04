import { Primitives } from '../../../../Shared/Domain/Primitives';
import { Query } from '../../../../Shared/Domain/Query';
import { QueryHandler } from '../../../../Shared/Domain/QueryHandler';
import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { Follower } from '../../Domain/Follower';
import { GetFollowersOfUserQuery } from '../../Domain/Query/GetFollowersOfUserQuery';
import { GetFollowersOfUser } from './GetFollowersOfUser';

export class GetFollowersOfUserQueryHandler
  implements QueryHandler<GetFollowersOfUserQuery, Primitives<Follower>[]>
{
  constructor(private service: GetFollowersOfUser) {}

  subscribedTo(): Query {
    return GetFollowersOfUserQuery;
  }

  async handle(query: GetFollowersOfUserQuery): Promise<Primitives<Follower>[]> {
    const userId = new UserId(query.userId);
    const followers = await this.service.execute(userId);
    return followers.map(f => f.toPrimitives());
  }
}
