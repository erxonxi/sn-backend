import { RabbitMQConfig } from '../../../../Contexts/Mooc/Shared/Infrastructure/RabbitMQ/RabbitMQConfigFactory';
import { DomainEventSubscribers } from '../../../../Contexts/Shared/Infrastructure/EventBus/DomainEventSubscribers';
import { RabbitMQConfigurer } from '../../../../Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQConfigurer';
import { RabbitMqConnection } from '../../../../Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMqConnection';
import container from '../dependency-injection';

export class ConfigureRabbitMQCommand {
  static async run() {
    const connection = container.get<RabbitMqConnection>('Feeds.Shared.RabbitMQConnection');
    const { name: exchange } = container.get<RabbitMQConfig>(
      'Feeds.Shared.RabbitMQConfig'
    ).exchangeSettings;
    await connection.connect();

    const configurer = container.get<RabbitMQConfigurer>('Feeds.Shared.RabbitMQConfigurer');
    const subscribers = DomainEventSubscribers.from(container).items;

    await configurer.configure({ exchange, subscribers });
    await connection.close();
  }
}
