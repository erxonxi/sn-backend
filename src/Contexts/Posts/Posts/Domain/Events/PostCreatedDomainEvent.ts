import { DomainEvent } from '../../../../Shared/Domain/DomainEvent';

type CreatePostDomainEventAttributes = {
  readonly userId: string;
  readonly profileName: string;
  readonly message: string;
};

export class PostCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'post.created';

  readonly userId: string;
  readonly message: string;
  readonly profileName: string;

  constructor({
    aggregateId,
    userId,
    profileName,
    message,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    userId: string;
    profileName: string;
    message: string;
    occurredOn?: Date;
  }) {
    super({ eventName: PostCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.userId = userId;
    this.profileName = profileName;
    this.message = message;
  }

  toPrimitives(): CreatePostDomainEventAttributes {
    const { userId, profileName, message } = this;
    return {
      userId,
      profileName,
      message
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: CreatePostDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new PostCreatedDomainEvent({
      aggregateId,
      userId: attributes.userId,
      message: attributes.message,
      profileName: attributes.profileName,
      eventId,
      occurredOn
    });
  }
}
