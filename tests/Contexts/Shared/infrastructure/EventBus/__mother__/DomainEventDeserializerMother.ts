import { DomainEventDeserializer } from '../../../../../../src/Contexts/Shared/Infrastructure/EventBus/DomainEventDeserializer';
import { DomainEventSubscribers } from '../../../../../../src/Contexts/Shared/Infrastructure/EventBus/DomainEventSubscribers';
import { DomainEventSubscriberDummy } from '../__mocks__/DomainEventSubscriberDummy';

export class DomainEventDeserializerMother {
  static create() {
    const dummySubscriber = new DomainEventSubscriberDummy();
    const subscribers = new DomainEventSubscribers([dummySubscriber]);
    return DomainEventDeserializer.configure(subscribers);
  }
}
