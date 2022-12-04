import { EventBus } from '../../../Contexts/Shared/Domain/EventBus';
import { DomainEventSubscribers } from '../../../Contexts/Shared/Infrastructure/EventBus/DomainEventSubscribers';
import { RabbitMqConnection } from '../../../Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMqConnection';
import container from './dependency-injection';
import { Server } from './server';

export class FollowersBackendApp {
  server?: Server;

  async start() {
    const port = process.env.PORT || '5002';
    this.server = new Server(port);

    await this.configureEventBus();

    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    const rabbitMQConnection = container.get<RabbitMqConnection>(
      'Followers.Shared.RabbitMQConnection'
    );
    await rabbitMQConnection.close();
    return this.server?.stop();
  }

  private async configureEventBus() {
    const eventBus = container.get<EventBus>('Followers.Shared.Domain.EventBus');
    const rabbitMQConnection = container.get<RabbitMqConnection>(
      'Followers.Shared.RabbitMQConnection'
    );
    await rabbitMQConnection.connect();

    eventBus.addSubscribers(DomainEventSubscribers.from(container));
  }
}
