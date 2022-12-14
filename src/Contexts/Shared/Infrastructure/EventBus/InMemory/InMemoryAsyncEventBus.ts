import { EventEmitter } from 'events';
import { DomainEvent } from '../../../Domain/DomainEvent';
import { EventBus } from '../../../Domain/EventBus';
import { DomainEventSubscribers } from '../DomainEventSubscribers';

export class InMemoryAsyncEventBus extends EventEmitter implements EventBus {
  async publish(events: DomainEvent[]): Promise<void> {
    events.map(event => this.emit(event.eventName, event));
  }

  addSubscribers(subscribers: DomainEventSubscribers) {
    subscribers.items.forEach(subscriber => {
      subscriber.subscribedTo().forEach(event => {
        this.on(event.EVENT_NAME, subscriber.on.bind(subscriber));
      });
    });
  }
}
