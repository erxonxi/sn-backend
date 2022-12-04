import { GetFollowersOfUserQuery } from '../../../../../../src/Contexts/Followers/Followers/Domain/Query/GetFollowersOfUserQuery';
import { UserId } from '../../../../../../src/Contexts/Shared/Domain/Users/UserId';
import { UserIdMother } from '../../../../Mooc/Shared/domain/UserIdMother';

export class GetFollowersOfUserQueryMother {
  static create(userId: UserId): GetFollowersOfUserQuery {
    return { userId: userId.value };
  }

  static random(): GetFollowersOfUserQuery {
    return this.create(UserIdMother.random());
  }
}
