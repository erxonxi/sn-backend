import { Follower } from '../../../Followers/Followers/Domain/Follower';
import { UserId } from '../../../Shared/Domain/Users/UserId';

export interface FollowersService {
  getFolloersOfUser(id: UserId): Promise<Follower[]>;
}
