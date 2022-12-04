import { FollowCommand } from '../../../../../src/Contexts/Followers/Followers/Domain/Commands/FollowCommand';
import { UnfollowCommand } from '../../../../../src/Contexts/Followers/Followers/Domain/Commands/UnfollowCommand';
import { Follower } from '../../../../../src/Contexts/Followers/Followers/Domain/Follower';
import { FollowerId } from '../../../../../src/Contexts/Followers/Shared/Domain/Followers/FollowerId';
import { UserId } from '../../../../../src/Contexts/Shared/Domain/Users/UserId';
import { UserIdMother } from '../../../Mooc/Shared/domain/UserIdMother';
import { FollowerIdMother } from '../../Shared/FollowerIdMother';

export class FollowerMother {
  static create(id: FollowerId, userId: UserId, followerUserId: UserId): Follower {
    return new Follower(id, userId, followerUserId);
  }

  static fromFollowCommand(command: FollowCommand): Follower {
    return this.create(
      FollowerIdMother.create(command.id),
      UserIdMother.create(command.userId),
      UserIdMother.create(command.followerUserId)
    );
  }

  static fromUnfollowCommand(command: UnfollowCommand): Follower {
    return this.create(
      FollowerIdMother.random(),
      UserIdMother.create(command.userId),
      UserIdMother.create(command.followerUserId)
    );
  }

  static random(): Follower {
    return this.create(FollowerIdMother.random(), UserIdMother.random(), UserIdMother.random());
  }

  static withUserId(userId: UserId): Follower {
    return this.create(FollowerIdMother.random(), userId, UserIdMother.random());
  }
}
