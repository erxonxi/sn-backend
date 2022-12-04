import { DomainEvent } from '../../../../Shared/Domain/DomainEvent';

type CreateUserDomainEventAttributes = {
  readonly email: string;
};

export class UserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.created';

  readonly email: string;

  constructor({
    aggregateId,
    email,
    eventId,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    email: string;
    occurredOn?: Date;
  }) {
    super({ eventName: UserCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.email = email;
  }

  toPrimitives(): CreateUserDomainEventAttributes {
    const { email } = this;
    return {
      email
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: CreateUserDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new UserCreatedDomainEvent({
      aggregateId,
      email: attributes.email,
      eventId,
      occurredOn
    });
  }
}
