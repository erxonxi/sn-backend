import { MoocService } from '../../../../../src/Contexts/Followers/Followers/Domain/MoocService';
import { UserId } from '../../../../../src/Contexts/Shared/Domain/Users/UserId';

export class MoocServiceMock implements MoocService {
  private throw: boolean;

  constructor() {
    this.throw = false;
  }

  async checkUserExist(id: UserId): Promise<void> {
    if (this.throw) {
      throw new Error('User not found');
    }
  }
}
