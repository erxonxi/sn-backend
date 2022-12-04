import { Criteria } from '../../../Shared/Domain/criteria/Criteria';
import { Nullable } from '../../../Shared/Domain/Nullable';
import { ProfileId } from '../../Shared/Domain/Profiles/ProfileId';
import { Profile } from './Profile';

export interface ProfilesRepository {
  save(user: Profile): Promise<void>;
  search(id: ProfileId): Promise<Nullable<Profile>>;
  all(): Promise<Array<Profile>>;
  delete(criteria: Criteria): Promise<void>;
  matching(criteria: Criteria): Promise<Array<Profile>>;
}
