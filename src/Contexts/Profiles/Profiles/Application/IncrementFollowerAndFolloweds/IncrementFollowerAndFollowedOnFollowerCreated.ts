import { FollowerCreatedDomainEvent } from '../../../../Followers/Followers/Domain/Events/FollowerCreatedDomainEvent';
import { DomainEventClass } from '../../../../Shared/Domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/Domain/DomainEventSubscriber';
import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { IncrementFollowed } from './IncrementFollowed';
import { IncrementFollower } from './IncrementFollower';

export class IncrementFollowerAndFollowedOnFollowerCreated
  implements DomainEventSubscriber<FollowerCreatedDomainEvent>
{
  constructor(
    private incrementFollower: IncrementFollower,
    private incrementFollowed: IncrementFollowed
  ) {}

  subscribedTo(): DomainEventClass[] {
    return [FollowerCreatedDomainEvent];
  }

  async on(domainEvent: FollowerCreatedDomainEvent): Promise<void> {
    const userId = new UserId(domainEvent.userId);
    const followerUserId = new UserId(domainEvent.followerUserId);
    await this.incrementFollower.execute(userId);
    await this.incrementFollowed.execute(followerUserId);
  }
}
