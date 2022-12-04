import { EventBus } from '../../../../Shared/Domain/EventBus';
import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { FollowerId } from '../../../Shared/Domain/Followers/FollowerId';
import { FindFollowCriteria } from '../../Domain/Criteria/FindFollowCriteria';
import { FollowerNotFound } from '../../Domain/Errors/FollowerNotFound';
import { Follower } from '../../Domain/Follower';
import { FollowersRepository } from '../../Domain/FollowersRepository';
import { MoocService } from '../../Domain/MoocService';

export class Follow {
  constructor(
    private repository: FollowersRepository,
    private eventBus: EventBus,
    private moocService: MoocService
  ) {}

  async run(params: { id: FollowerId; userId: UserId; followerUserId: UserId }): Promise<void> {
    await this.checkFollowExist(params.userId, params.followerUserId);
    await this.checkUsersExist(params.userId, params.followerUserId);

    const follower = Follower.create(params.id, params.userId, params.followerUserId);

    await this.repository.save(follower);
    await this.eventBus.publish(follower.pullDomainEvents());
  }

  private async checkFollowExist(userId: UserId, followerUserId: UserId) {
    const follow = await this.repository.matching(new FindFollowCriteria(userId, followerUserId));

    if (follow.length > 0) {
      throw new FollowerNotFound();
    }
  }

  private async checkUsersExist(userId: UserId, followerUserId: UserId) {
    await this.moocService.checkUserExist(userId);
    await this.moocService.checkUserExist(followerUserId);
  }
}
