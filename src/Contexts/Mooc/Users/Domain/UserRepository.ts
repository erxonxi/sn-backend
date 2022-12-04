import { Criteria } from '../../../Shared/Domain/criteria/Criteria';
import { Nullable } from '../../../Shared/Domain/Nullable';
import { UserId } from '../../../Shared/Domain/Users/UserId';
import { User } from './User';

export interface UserRepository {
  save(user: User): Promise<void>;
  search(id: UserId): Promise<Nullable<User>>;
  all(): Promise<Array<User>>;
  matching(criteria: Criteria): Promise<Array<User>>;
}
