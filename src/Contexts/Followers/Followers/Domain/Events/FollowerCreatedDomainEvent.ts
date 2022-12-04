import { DomainEvent } from '../../../../Shared/Domain/DomainEvent';

type CreateFollowerDomainEventAttributes = {
  readonly userId: string;
  readonly followerUserId: string;
};

export class FollowerCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'follower.created';

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
    super({ eventName: FollowerCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.userId = userId;
    this.followerUserId = followerUserId;
  }

  toPrimitives(): CreateFollowerDomainEventAttributes {
    const { userId, followerUserId } = this;
    return {
      userId,
      followerUserId
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: CreateFollowerDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new FollowerCreatedDomainEvent({
      aggregateId,
      userId: attributes.userId,
      followerUserId: attributes.followerUserId,
      eventId,
      occurredOn
    });
  }
}
