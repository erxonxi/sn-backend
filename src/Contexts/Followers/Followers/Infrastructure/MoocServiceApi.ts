import { UserId } from '../../../Shared/Domain/Users/UserId';
import followersConfig from '../../Shared/Infrastructure/config';
import { MoocService } from '../Domain/MoocService';

export class MoocServiceApi implements MoocService {
  async checkUserExist(id: UserId): Promise<void> {
    const URL = followersConfig.get('mooc_service.url');

    const response = await fetch(`${URL}/v1/users/${id.toString()}`);

    if (!response.ok) {
      throw new Error('User not found');
    }
  }
}
