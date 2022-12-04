import { Criteria } from '../../../Shared/Domain/criteria/Criteria';
import { Nullable } from '../../../Shared/Domain/Nullable';
import { FeedId } from '../../Shared/Domain/Feeds/FeedId';
import { Feed } from './Feed';

export interface FeedsRepository {
  save(user: Feed): Promise<void>;
  search(id: FeedId): Promise<Nullable<Feed>>;
  all(): Promise<Array<Feed>>;
  delete(criteria: Criteria): Promise<void>;
  matching(criteria: Criteria): Promise<Array<Feed>>;
}
