import { DomainEventFailoverPublisher } from '../../../../Shared/Infrastructure/EventBus/DomainEventFailoverPublisher/DomainEventFailoverPublisher';
import { RabbitMqConnection } from '../../../../Shared/Infrastructure/EventBus/RabbitMQ/RabbitMqConnection';
import { RabbitMQEventBus } from '../../../../Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQEventBus';
import { RabbitMQqueueFormatter } from '../../../../Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQqueueFormatter';
import { RabbitMQConfig } from './RabbitMQConfigFactory';

export class RabbitMQEventBusFactory {
  static create(
    failoverPublisher: DomainEventFailoverPublisher,
    connection: RabbitMqConnection,
    queueNameFormatter: RabbitMQqueueFormatter,
    config: RabbitMQConfig
  ): RabbitMQEventBus {
    return new RabbitMQEventBus({
      failoverPublisher,
      connection,
      exchange: config.exchangeSettings.name,
      queueNameFormatter: queueNameFormatter,
      maxRetries: config.maxRetries
    });
  }
}
