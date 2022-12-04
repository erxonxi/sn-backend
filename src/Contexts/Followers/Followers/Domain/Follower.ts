import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { UserId } from '../../../Shared/Domain/Users/UserId';
import { FollowerId } from '../../Shared/Domain/Followers/FollowerId';
import { FollowerCreatedDomainEvent } from './Events/FollowerCreatedDomainEvent';
import { FollowerDeletedDomainEvent } from './Events/FollowerDeletedDomainEvent';

export class Follower extends AggregateRoot {
  id: FollowerId;
  userId: UserId;
  followerUserId: UserId;

  constructor(id: FollowerId, userId: UserId, followerUserId: UserId) {
    super();
    this.id = id;
    this.userId = userId;
    this.followerUserId = followerUserId;
  }

  static create(id: FollowerId, userId: UserId, followerUserId: UserId): Follower {
    const user = new Follower(id, userId, followerUserId);

    user.record(
      new FollowerCreatedDomainEvent({
        aggregateId: user.id.value,
        userId: user.userId.value,
        followerUserId: user.followerUserId.value
      })
    );

    return user;
  }

  static fromPrimitives(plainData: {
    id: string;
    userId: string;
    followerUserId: string;
  }): Follower {
    return new Follower(
      new FollowerId(plainData.id),
      new UserId(plainData.userId),
      new UserId(plainData.followerUserId)
    );
  }

  update(args: { followerUserId?: UserId }): void {
    if (args.followerUserId) this.followerUserId = args.followerUserId;
  }

  delete() {
    this.record(
      new FollowerDeletedDomainEvent({
        aggregateId: this.id.value,
        userId: this.userId.value,
        followerUserId: this.followerUserId.value
      })
    );
  }

  toPrimitives(): Primitives<Follower> {
    return {
      id: this.id.value,
      userId: this.userId.value,
      followerUserId: this.followerUserId.value
    };
  }
}
