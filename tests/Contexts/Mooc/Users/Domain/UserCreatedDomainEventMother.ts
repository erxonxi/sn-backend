import { UserCreatedDomainEvent } from '../../../../../src/Contexts/Mooc/Users/Domain/Events/UserCreatedDomainEvent';
import { User } from '../../../../../src/Contexts/Mooc/Users/Domain/User';

export class UserCreatedDomainEventMother {
  static create({
    aggregateId,
    eventId,
    email,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    email: string;
    password: string;
    occurredOn?: Date;
  }): UserCreatedDomainEvent {
    return new UserCreatedDomainEvent({
      aggregateId,
      eventId,
      email,
      occurredOn
    });
  }

  static fromUser(user: User): UserCreatedDomainEvent {
    return new UserCreatedDomainEvent({
      aggregateId: user.id.value,
      email: user.email.value
    });
  }
}
