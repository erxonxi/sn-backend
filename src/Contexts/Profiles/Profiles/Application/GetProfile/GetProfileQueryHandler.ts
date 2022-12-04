import { Primitives } from '../../../../Shared/Domain/Primitives';
import { Query } from '../../../../Shared/Domain/Query';
import { QueryHandler } from '../../../../Shared/Domain/QueryHandler';
import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { Profile } from '../../Domain/Profile';
import { GetProfileQuery } from '../../Domain/Query/GetProfileQuery';
import { GetProfile } from './GetProfile';

export class GetProfileQueryHandler implements QueryHandler<GetProfileQuery, Primitives<Profile>> {
  constructor(private service: GetProfile) {}

  subscribedTo(): Query {
    return GetProfileQuery;
  }

  async handle(query: GetProfileQuery): Promise<any> {
    const userId = new UserId(query.userId);
    const profile = await this.service.execute(userId);
    return profile.toPrimitives();
  }
}
