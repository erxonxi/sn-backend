import { FollowerCreatedDomainEvent } from '../../../../Followers/Followers/Domain/Events/FollowerCreatedDomainEvent';
import { DomainEventClass } from '../../../../Shared/Domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/Domain/DomainEventSubscriber';
import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { InsertPosts } from './InsertPosts';

export class InsertPostsOnFollow implements DomainEventSubscriber<FollowerCreatedDomainEvent> {
  constructor(private insertPosts: InsertPosts) {}

  subscribedTo(): DomainEventClass[] {
    return [FollowerCreatedDomainEvent];
  }

  async on(domainEvent: FollowerCreatedDomainEvent): Promise<void> {
    const params = {
      userId: new UserId(domainEvent.userId),
      followerUserId: new UserId(domainEvent.followerUserId)
    };

    this.insertPosts.execute(params);
  }
}
