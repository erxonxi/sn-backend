import { FollowerCreatedDomainEvent } from '../../../../../src/Contexts/Followers/Followers/Domain/Events/FollowerCreatedDomainEvent';
import { Follower } from '../../../../../src/Contexts/Followers/Followers/Domain/Follower';

export class FollowerCreatedDomainEventMother {
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
  }): FollowerCreatedDomainEvent {
    return new FollowerCreatedDomainEvent({
      aggregateId,
      eventId,
      userId,
      followerUserId,
      occurredOn
    });
  }

  static fromFollower(follower: Follower): FollowerCreatedDomainEvent {
    return new FollowerCreatedDomainEvent({
      aggregateId: follower.id.value,
      userId: follower.userId.value,
      followerUserId: follower.followerUserId.value
    });
  }
}
