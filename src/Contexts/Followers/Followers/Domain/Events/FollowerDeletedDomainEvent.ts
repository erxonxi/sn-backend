import { DomainEvent } from '../../../../Shared/Domain/DomainEvent';

type DeleteFollowerDomainEventAttributes = {
  readonly userId: string;
  readonly followerUserId: string;
};

export class FollowerDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'follower.deleted';

  readonly userId: string;
  readonly followerUserId: string;

  constructor({
    aggregateId,
    userId,
    followerUserId,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    userId: string;
    followerUserId: string;
    occurredOn?: Date;
  }) {
    super({ eventName: FollowerDeletedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.userId = userId;
    this.followerUserId = followerUserId;
  }

  toPrimitives(): DeleteFollowerDomainEventAttributes {
    const { userId, followerUserId } = this;
    return {
      userId,
      followerUserId
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: DeleteFollowerDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new FollowerDeletedDomainEvent({
      aggregateId,
      userId: attributes.userId,
      followerUserId: attributes.followerUserId,
      eventId,
      occurredOn
    });
  }
}
