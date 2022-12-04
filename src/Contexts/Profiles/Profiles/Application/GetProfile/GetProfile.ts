import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { ProfileId } from '../../../Shared/Domain/Profiles/ProfileId';
import { ProfileUserCriteria } from '../../Domain/Criteria/ProfileUserCriteria';
import { Profile } from '../../Domain/Profile';
import { ProfileCount } from '../../Domain/ProfileCount';
import { ProfileName } from '../../Domain/ProfileName';
import { ProfilesRepository } from '../../Domain/ProfilesRepository';

export class GetProfile {
  constructor(private repository: ProfilesRepository) {}

  async execute(userId: UserId) {
    const profiles = await this.repository.matching(new ProfileUserCriteria(userId));

    let profile: Profile;
    if (profiles.length > 0) {
      profile = profiles[0];
    } else {
      profile = Profile.create({
        userId,
        id: ProfileId.random(),
        name: new ProfileName(userId.value),
        followeds: new ProfileCount(0),
        followers: new ProfileCount(0)
      });
      await this.repository.save(profile);
    }

    return profile;
  }
}
