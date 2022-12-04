import { EventBus } from '../../../../Shared/Domain/EventBus';
import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { FindFollowCriteria } from '../../Domain/Criteria/FindFollowCriteria';
import { FollowerNotFound } from '../../Domain/Errors/FollowerNotFound';
import { FollowersRepository } from '../../Domain/FollowersRepository';

export class Unfollow {
  constructor(private repository: FollowersRepository, private eventBus: EventBus) {}

  async run({ userId, followerUserId }: { userId: UserId; followerUserId: UserId }): Promise<void> {
    const follow = await this.findFollow(userId, followerUserId);

    follow.delete();

    await this.repository.delete(new FindFollowCriteria(userId, followerUserId));
    await this.eventBus.publish(follow.pullDomainEvents());
  }

  private async findFollow(userId: UserId, followerUserId: UserId) {
    const follow = await this.repository.matching(new FindFollowCriteria(userId, followerUserId));

    if (follow.length == 0) {
      throw new FollowerNotFound();
    }

    return follow[0];
  }
}
