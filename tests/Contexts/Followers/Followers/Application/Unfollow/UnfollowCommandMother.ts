import { UnfollowCommand } from '../../../../../../src/Contexts/Followers/Followers/Domain/Commands/UnfollowCommand';
import { UserId } from '../../../../../../src/Contexts/Shared/Domain/Users/UserId';
import { UserIdMother } from '../../../../Mooc/Shared/domain/UserIdMother';

export class UnfollowCommandMother {
  static create(userId: UserId, followerUserId: UserId): UnfollowCommand {
    return { userId: userId.value, followerUserId: followerUserId.value };
  }

  static random(): UnfollowCommand {
    return this.create(UserIdMother.random(), UserIdMother.random());
  }
}
