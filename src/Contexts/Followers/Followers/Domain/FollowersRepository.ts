import { Criteria } from '../../../Shared/Domain/criteria/Criteria';
import { Nullable } from '../../../Shared/Domain/Nullable';
import { FollowerId } from '../../Shared/Domain/Followers/FollowerId';
import { Follower } from './Follower';

export interface FollowersRepository {
  save(user: Follower): Promise<void>;
  search(id: FollowerId): Promise<Nullable<Follower>>;
  all(): Promise<Array<Follower>>;
  delete(criteria: Criteria): Promise<void>;
  matching(criteria: Criteria): Promise<Array<Follower>>;
}
