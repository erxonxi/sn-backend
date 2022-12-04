import { FollowerDeletedDomainEvent } from '../../../../Followers/Followers/Domain/Events/FollowerDeletedDomainEvent';
import { DomainEventClass } from '../../../../Shared/Domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/Domain/DomainEventSubscriber';
import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { DecrementFollowed } from './DecrementFollowed';
import { DecrementFollower } from './DecrementFollower';

export class DecrementFollowerAndFollowedOnFollowerCreated
  implements DomainEventSubscriber<FollowerDeletedDomainEvent>
{
  constructor(
    private decrementFollower: DecrementFollower,
    private decrementFollowed: DecrementFollowed
  ) {}

  subscribedTo(): DomainEventClass[] {
    return [FollowerDeletedDomainEvent];
  }

  async on(domainEvent: FollowerDeletedDomainEvent): Promise<void> {
    const userId = new UserId(domainEvent.userId);
    const followerUserId = new UserId(domainEvent.followerUserId);
    await this.decrementFollower.execute(userId);
    await this.decrementFollowed.execute(followerUserId);
  }
}
