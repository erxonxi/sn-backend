import { FollowCommand } from '../../../../../../src/Contexts/Followers/Followers/Domain/Commands/FollowCommand';
import { FollowerId } from '../../../../../../src/Contexts/Followers/Shared/Domain/Followers/FollowerId';
import { UserId } from '../../../../../../src/Contexts/Shared/Domain/Users/UserId';
import { UserIdMother } from '../../../../Mooc/Shared/domain/UserIdMother';
import { FollowerIdMother } from '../../../Shared/FollowerIdMother';

export class FollowCommandMother {
  static create(id: FollowerId, userId: UserId, followerUserId: UserId): FollowCommand {
    return { id: id.value, userId: userId.value, followerUserId: followerUserId.value };
  }

  static random(): FollowCommand {
    return this.create(FollowerIdMother.random(), UserIdMother.random(), UserIdMother.random());
  }
}
