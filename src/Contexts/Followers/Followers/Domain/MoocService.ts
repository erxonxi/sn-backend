import { UserId } from '../../../Shared/Domain/Users/UserId';

export interface MoocService {
  checkUserExist(id: UserId): Promise<void>;
}
