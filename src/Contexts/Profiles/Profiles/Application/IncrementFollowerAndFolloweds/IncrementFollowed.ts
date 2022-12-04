import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { ProfilesRepository } from '../../Domain/ProfilesRepository';
import { GetProfile } from '../GetProfile/GetProfile';

export class IncrementFollowed {
  constructor(
    private readonly repository: ProfilesRepository,
    private readonly getProfile: GetProfile
  ) {}

  async execute(userId: UserId) {
    const profile = await this.getProfile.execute(userId);
    profile.incrementFolloweds();
    await this.repository.save(profile);
  }
}
