import { FollowerDeletedDomainEvent } from '../../../../../src/Contexts/Followers/Followers/Domain/Events/FollowerDeletedDomainEvent';
import { Follower } from '../../../../../src/Contexts/Followers/Followers/Domain/Follower';

export class FollowerDeletedDomainEventMother {
  static create({
    aggregateId,
    eventId,
    userId,
    followerUserId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    userId: string;
    followerUserId: string;
    occurredOn?: Date;
  }): FollowerDeletedDomainEvent {
    return new FollowerDeletedDomainEvent({
      aggregateId,
      eventId,
      userId,
      followerUserId,
      occurredOn
    });
  }

  static fromFollower(follower: Follower): FollowerDeletedDomainEvent {
    return new FollowerDeletedDomainEvent({
      aggregateId: follower.id.value,
      userId: follower.userId.value,
      followerUserId: follower.followerUserId.value
    });
  }
}
