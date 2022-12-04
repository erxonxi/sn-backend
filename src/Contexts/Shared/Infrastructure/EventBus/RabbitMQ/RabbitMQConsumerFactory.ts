import { DomainEvent } from '../../../Domain/DomainEvent';
import { DomainEventSubscriber } from '../../../Domain/DomainEventSubscriber';
import { DomainEventDeserializer } from '../DomainEventDeserializer';
import { RabbitMqConnection } from './RabbitMqConnection';
import { RabbitMQConsumer } from './RabbitMQConsumer';

export class RabbitMQConsumerFactory {
  constructor(
    private deserializer: DomainEventDeserializer,
    private connection: RabbitMqConnection,
    private maxRetries: number
  ) {}

  build(subscriber: DomainEventSubscriber<DomainEvent>, exchange: string, queueName: string) {
    return new RabbitMQConsumer({
      subscriber,
      deserializer: this.deserializer,
      connection: this.connection,
      queueName,
      exchange,
      maxRetries: this.maxRetries
    });
  }
}
