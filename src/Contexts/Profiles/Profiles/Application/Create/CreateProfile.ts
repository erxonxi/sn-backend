import { EventBus } from '../../../../Shared/Domain/EventBus';
import { UserId } from '../../../../Shared/Domain/Users/UserId';
import { ProfileId } from '../../../Shared/Domain/Profiles/ProfileId';
import { Profile } from '../../Domain/Profile';
import { ProfileCount } from '../../Domain/ProfileCount';
import { ProfileName } from '../../Domain/ProfileName';
import { ProfilesRepository } from '../../Domain/ProfilesRepository';

type CreateProfileParams = {
  id: ProfileId;
  userId: UserId;
  name: ProfileName;
};

export class CreateProfile {
  constructor(
    private readonly repository: ProfilesRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute({ id, userId, name }: CreateProfileParams) {
    const profile = Profile.create({
      id,
      userId,
      name,
      followeds: new ProfileCount(0),
      followers: new ProfileCount(0)
    });

    await this.repository.save(profile);
    await this.eventBus.publish(profile.pullDomainEvents());
  }
}
