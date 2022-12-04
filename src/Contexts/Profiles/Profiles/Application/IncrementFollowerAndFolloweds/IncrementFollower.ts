import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { ProfilesRepository } from '../../Domain/ProfilesRepository';
import { GetProfile } from '../GetProfile/GetProfile';

export class IncrementFollower {
  constructor(
    private readonly repository: ProfilesRepository,
    private readonly getProfile: GetProfile
  ) {}

  async execute(userId: UserId) {
    const profile = await this.getProfile.execute(userId);
    profile.incrementFollowers();
    await this.repository.save(profile);
  }
}
