import { Follower } from '../../../Followers/Followers/Domain/Follower';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { UserId } from '../../../Shared/Domain/Users/UserId';
import feedsConfig from '../../Shared/Infrastructure/config';
import { FollowersService } from '../Domain/FollowersService';

export class FollowersServiceApi implements FollowersService {
  async getFolloersOfUser(id: UserId): Promise<Follower[]> {
    const URL = feedsConfig.get('followers_service.url');
    const response = await fetch(`${URL}/v1/followers/users/${id.toString()}`);
    if (!response.ok) {
      throw new Error('FollowersServiceApi error fetching data');
    }

    const followersPrimitives: Primitives<Follower>[] = await response.json();

    return followersPrimitives.map(follower => Follower.fromPrimitives(follower));
  }
}
