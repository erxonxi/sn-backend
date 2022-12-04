import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { FindFollowersUserCriteria } from '../../Domain/Criteria/FindFollowersUserCriteria';
import { Follower } from '../../Domain/Follower';
import { FollowersRepository } from '../../Domain/FollowersRepository';

export class GetFollowersOfUser {
  constructor(private repository: FollowersRepository) {}

  async execute(userId: UserId): Promise<Follower[]> {
    return await this.repository.matching(new FindFollowersUserCriteria(userId));
  }
}
