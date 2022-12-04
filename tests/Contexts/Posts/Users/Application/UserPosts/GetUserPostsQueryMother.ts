import { GetUserPostsQuery } from '../../../../../../src/Contexts/Posts/Posts/Domain/Query/GetUserPostsQuery';
import { UserId } from '../../../../../../src/Contexts/Shared/Domain/Users/UserId';
import { UserIdMother } from '../../../../Mooc/Shared/domain/UserIdMother';

export class GetUserPostsQueryMother {
  static create(userId: UserId): GetUserPostsQuery {
    return { userId: userId.value };
  }

  static random(): GetUserPostsQuery {
    return this.create(UserIdMother.random());
  }
}
